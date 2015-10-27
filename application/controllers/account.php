<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

require_once('Braintree.php');

class Account extends UVod_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('account_model');
        $this->load->model('social_media_model');
        $this->load->helper('pdk');
    }

    public function forgot() {
        $data = array();

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/forgot', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function forgot_complete() {

        $data = array();

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/forgot_complete', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function subscription_ssl() {

        $data = array();

        $subscription = $this->account_model->get_subscriptions();
        if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
            $data['subscriptions'] = $subscription->content->entries;

            usort($data['subscriptions'], function($a, $b) {
                if (intval($a->{'plsubscription$subscriptionLength'}) == intval($b->{'plsubscription$subscriptionLength'})) {
                    return 0;
                }
                return (intval($a->{'plsubscription$subscriptionLength'}) < intval($b->{'plsubscription$subscriptionLength'})) ? -1 : 1;
            });
        }

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/subscription', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function register_ssl() {
        $data = array();

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/register', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function register_step1_ssl() {

        $ret = new stdClass();
        $ret->message = "ok";

        if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $ret->message = "The email entered is invalid.";
        } elseif (!isset($_POST['password'])) {
            $ret->message = "You must specify a password.";
        } elseif (strlen($_POST['password']) < 8 || strlen($_POST['password']) > 16) {
            $ret->message = "Password must have between 8 and 16 chars lenght.";
        } elseif ($this->account_model->exists_user_email($_POST['email'])) {
            $ret->message = "The selected email already exists.";
        }
        if (!isset($_POST['full_name']) || strlen($_POST['full_name']) < 3) {
            $ret->message = "You need to specify your full name.";
        }

// saves registration information in session
        if ($ret->message == "ok") {
            $_SESSION['registration_data'] = new stdClass();
            $_SESSION['registration_data']->email = $_POST['email'];
            $_SESSION['registration_data']->password = $_POST['password'];

            $full_name = explode(' ', $_POST['full_name']);
            $sizeof_name = sizeof($full_name);
            $first_name = $full_name[0];
            if ($sizeof_name == 1) {
                $last_name = '';
            } else {
                $last_name = '';
                for ($i = 1; $i < ($sizeof_name); $i++) {
                    if ($i > 0) {
                        $last_name .= ' ';
                    }
                    $last_name .= $full_name[$i];
                }
            }

            $GLOBALS['hash'] = rand(10000, getrandmax());

            $register = $this->account_model->register($_POST['email'], $_POST['password'], $first_name, $last_name, $_POST['country'], $GLOBALS['hash']);
            $ret = $register;

            if (!$register->error) {

// logs current user to get security token

                $current_user = $this->account_model->simple_login($_POST['email'], $_POST['password']);
                $ret = $current_user;

                if (!$current_user->error) {

                    $_SESSION['registration_data']->user_id = $current_user->content->id;
                    $_SESSION['registration_data']->user_token = $current_user->content->token;
                    $_SESSION['registration_data']->profile_id = $register->content->id;
                    $_SESSION['registration_data']->first_name = $first_name;
                    $_SESSION['registration_data']->last_name = $last_name;
                    $_SESSION['registration_data']->country = $_POST['country'];
                    $_SESSION['registration_data']->hash = $GLOBALS['hash'];
                    $_SESSION['registration_data']->method = 'email';

                    $this->send_activation_mail($first_name, $last_name, $_POST['email'], $_SESSION['registration_data']->hash);
                }
            }
        }


        echo json_encode($ret);
    }

    public function register_step2_ssl() {

        if (isset($_SESSION['registration_data'])) {
            $token = $_SESSION['registration_data']->user_token;

            if (isset($_POST['nonce'])) {
                $nonce = $_POST['nonce'];
            } else {
                $nonce = '';
            }

            $first_name = $_SESSION['registration_data']->first_name;
            $last_name = $_SESSION['registration_data']->last_name;
            $email = $_SESSION['registration_data']->email;
            $country = $_SESSION['registration_data']->country;
            $pi_month = $_POST['pi_month'];
            $pi_year = $_POST['pi_year'];
            $pi_type = $_POST['pi_type'];
            $pi_number = $_POST['pi_number'];
            $pi_security_code = $_POST['security_code'];
            $subscription_id = $_POST['subscription_id'];
            $auto_renew = $_POST['auto_renew'];

            $ret = $this->account_model->subscription_checkout($token, $nonce, $first_name, $last_name, $email, $country, $pi_month, $pi_year, $pi_type, $pi_number, $pi_security_code, $subscription_id, $auto_renew);

            if (isset($ret->error) && $ret->error == false) {
                $this->subscription_complete_mail($first_name, $last_name, $email);
                echo json_encode(array('status' => 'ok'));
            } else {
                echo json_encode(array('status' => 'error', 'message' => $ret->message,));
            }
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'Internal Error. Please finish the registration process, then get the subscription in My Account section.'));
        }
    }

    public function register_payment_ssl() {

        $data = array();
        $subscription = $this->account_model->get_subscriptions();
        if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
            $data['subscriptions'] = $subscription->content->entries;

            usort($data['subscriptions'], function($a, $b) {
                if (intval($a->{'plsubscription$subscriptionLength'}) == intval($b->{'plsubscription$subscriptionLength'})) {
                    return 0;
                }
                return (intval($a->{'plsubscription$subscriptionLength'}) < intval($b->{'plsubscription$subscriptionLength'})) ? -1 : 1;
            });
        }

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/register_payment', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function register_complete() {
        if (isset($_SESSION['registration_data']->user_id)) {
            $logout = $this->account_model->logout($_SESSION['registration_data']->user_id);
        }
        $data = array();
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/register_complete', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function register_subscription_complete() {
        $data = array();
        if (isset($_SESSION['registration_data']->user_id)) {
            $logout = $this->account_model->logout($_SESSION['registration_data']->user_id);
        }

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/register_subscription_complete', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function signin() {
        $data = array();
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/signin', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function my_account() {

        if (!isset($_SESSION['uvod_user_data']) || !isset($_SESSION['uvod_user_data']->token)) {
            redirect(base_url() . 'index.php/account/signin');
        }

        $data = array();
        $user_profile = $this->account_model->get_profile($_SESSION['uvod_user_data']->token);
        $subscription = $this->account_model->get_contract($_SESSION['uvod_user_data']->id);

        if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
            $data['subscription_data'] = $subscription->content->entries;

            if ($user_profile && $user_profile->content) {
                if (isset($user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'customer_id'})) {
                    $customer_id = $user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'customer_id'};
                    $_SESSION['uvod_user_data']->braintree_id = $customer_id;
                    $customer_data = $this->account_model->get_billing_information($customer_id);

                    if (isset($customer_data) && $customer_data->error == false) {
                        $data['card_name'] = $customer_data->content->card_name;
                        $data['card_number'] = $customer_data->content->card_number;
                        $data['card_expiration_month'] = $customer_data->content->expiration_month;
                        $data['card_expiration_year'] = $customer_data->content->expiration_year;
                    }
                }
            }
        } else {

            $amount = '';
            $subscription = $this->account_model->get_subscriptions();
            if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
                $data['subscriptions'] = $subscription->content->entries;

                usort($data['subscriptions'], function($a, $b) {
                    if (intval($a->{'plsubscription$subscriptionLength'}) == intval($b->{'plsubscription$subscriptionLength'})) {
                        return 0;
                    }
                    return (intval($a->{'plsubscription$subscriptionLength'}) < intval($b->{'plsubscription$subscriptionLength'})) ? -1 : 1;
                });
            }
        }

        if ($user_profile && $user_profile->content) {
            $data['user_email'] = $user_profile->content[0]->{'pluserprofile$email'};
            $data['user_first_name'] = $user_profile->content[0]->{'pluserprofile$firstName'};
            $data['user_last_name'] = $user_profile->content[0]->{'pluserprofile$lastName'};
            $data['user_city'] = "";
            if (isset($user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'city'})) {
                $data['user_city'] = $user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'city'};
            }
            $data['user_country'] = $user_profile->content[0]->{'pluserprofile$countryCode'};
            $data['user_postal_code'] = $user_profile->content[0]->{'pluserprofile$postalCode'};
        } else {
            $data['user_email'] = "";
            $data['user_first_name'] = "";
            $data['user_last_name'] = "";
            $data['user_city'] = "";
            $data['user_country'] = "";
            $data['user_postal_code'] = "";
        }

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/account', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function my_account_save() {

        $save_profile = $this->account_model->save_profile($_SESSION['uvod_user_data']->token, $_SESSION['uvod_user_data']->id, $_POST['first_name'], $_POST['last_name'], $_POST['city'], $_POST['country'], $_POST['postal_code']);
        echo json_encode($save_profile);
    }

    public function logout() {

        if (isset($_SESSION['uvod_user_data'])) {

            $logout = $this->account_model->logout($_SESSION['uvod_user_data']->id);

            if (isset($logout->error) && !$logout->error) {

                $_SESSION['uvod_user_data'] = null;
                unset($_SESSION['uvod_user_data']);
            }
        }

        redirect(base_url());
    }

    public function login() {

        if (isset($_POST['email']) && isset($_POST['password'])) {

            $login = $this->account_model->login($_POST['email'], $_POST['password']);

            if (isset($login) && !$login->error) {
                $_SESSION['uvod_user_data'] = $login->content;

                if (isset($_POST['remember_credentials'])) {

                    unset($_COOKIE['UNIVCORP']);
                    $value = array();
                    $value['em'] = base64_encode($_POST['email']);
                    $value['pw'] = base64_encode($_POST['password']);
                    setcookie("UNIVCORP", serialize($value));
                    $_SESSION['session_expired'] = false;
                } else if (isset($_COOKIE['UNIVCORP'])) {

                    unset($_COOKIE['UNIVCORP']);
                    setcookie('UNIVCORP', "", time() - 3600);
                }
            }

            echo json_encode($login);
        }
    }

    public function forgot_step1() {

        $ret = new stdClass();
        $ret->message = "ok";

        if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $ret->message = "The email entered is invalid.";
        } elseif ($this->account_model->send_password_email($_POST['email']) == false) {
            $ret->message = "There is no user registered with that email.";
        }

// saves registration information in session
        if ($ret->message == "ok") {
            $_SESSION['registration_data'] = new stdClass();
            $_SESSION['registration_data']->email = $_POST['email'];
        }
        echo json_encode($ret);
    }

    public function change_password() {
        $data = array();
        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/change_password', $data);
        $this->load->view(views_url() . 'templates/footer', $data);
    }
    
    public function change_pass() {
        $ret = new stdClass();
        $ret->message = "ok";

        if (!isset($_POST['new_password'])) {
            $ret->message = "You must specify your current password.";
        } elseif (strlen($_POST['current_password']) < 8 || strlen($_POST['current_password']) > 16) {
            $ret->message = "current password have between 8 and 16 chars lenght.";
        } elseif (!isset($_POST['new_password'])) {
            $ret->message = "You must specify your new password.";
        } elseif (strlen($_POST['new_password']) < 8 || strlen($_POST['new_password']) > 16) {
            $ret->message = "your new password have between 8 and 16 chars lenght.";
        } elseif ($_POST['new_password'] != $_POST['confirm_password']) {
            $ret->message = "Passwords do not match.";
        }
// saves registration information in session
        if ($ret->message == "ok") {
            $ret = $this->account_model->change_password($_SESSION['uvod_user_data']->username, $_POST['current_password'], $_POST['new_password']);
        }

        echo json_encode($ret);
    }

    public function change_password_completed() {
        $data = array();
        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/password_changed', $data);
        $this->load->view(views_url() . 'templates/footer', $data);
    }

    public function send_activation_mail($name, $surname, $email, $hash) {
        $email_data = array();
        $email_data['name'] = $name;
        $email_data['surname'] = $surname;
        $email_data['activate_url'] = base_url() . 'index.php/account/activate_account?hash=' . $hash . "&email=" . $email;
        $message = $this->load->view(views_url() . 'templates/email_activate_account', $email_data, TRUE);

        if ($this->account_model->send_single_email($email, $message, "Activate your account", "NO_RESPONSE@1spot.com", "1Spot Service")) {
            return true;
        } else {
            return false;
        }
    }

    public function send_welcome_mail($name, $surname, $email) {
        $email_data = array();
        $email_data['name'] = $name;
        $email_data['surname'] = $surname;

        $message = $this->load->view(views_url() . 'templates/email_welcome', $email_data, TRUE);

        if ($this->account_model->send_single_email($email, $message, "Welcome to 1SpotMedia!", "NO_RESPONSE@1spot.com", "1Spot Service")) {
            return true;
        } else {
            return false;
        }
    }

    public function activate_account() {
        $data = array();
        $done = $this->account_model->activate_account($_GET['hash'], $_GET['email']);
        if ($done) {
            $data['status'] = "ok";
            $data['message1'] = "ACCOUNT ACTIVE!";
            $data['message2'] = "Your account was activated successfully.";
            $data['message3'] = "Now you can proceed with the login.";
        } else {
            $data['status'] = "error";
            $data['message1'] = "ERROR";
            $data['message2'] = "The activation process found an error.";
            $data['message3'] = "Please try again later.";
        }
        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/account_active', $data);
        $this->load->view(views_url() . 'templates/footer', $data);
    }

    public function subscribe_ssl() {

        if (isset($_SESSION['uvod_user_data'])) {
            $token = $_SESSION['uvod_user_data']->token;
        } else if (isset($_SESSION['registration_data']->user_token)) {
            $token = $_SESSION['registration_data']->user_token;
        }

        if (isset($_POST['nonce'])) {
            $nonce = $_POST['nonce'];
        } else {
            $nonce = '';
        }

        $first_name = $_SESSION['uvod_user_data']->firstName;
        $last_name = $_SESSION['uvod_user_data']->lastName;
        $email = $_SESSION['uvod_user_data']->email;
        $country = $_SESSION['uvod_user_data']->countryCode;
        $pi_month = $_POST['pi_month'];
        $pi_year = $_POST['pi_year'];
        $pi_type = $_POST['pi_type'];
        $pi_number = $_POST['pi_number'];
        $subscription_id = $_POST['subscription_id'];
        $auto_renew = $_POST['auto_renew'];

        $ret = $this->account_model->subscription_checkout($token, $nonce, $first_name, $last_name, $email, $country, $pi_month, $pi_year, $pi_type, $pi_number, $subscription_id, $auto_renew);

        if (isset($ret->error) && $ret->error == false) {
            $this->subscription_complete_mail($first_name, $last_name, $email);
            echo json_encode(array('status' => 'ok'));
        } else {

            echo json_encode(array('status' => 'error', 'message' => $ret->message));
        }
    }

    public function subscription_complete_mail($name, $surname, $email) {

        $email_data = array();
        $email_data['name'] = $name;
        $email_data['surname'] = $surname;
        $message = $this->load->view(views_url() . 'templates/email_subscription_complete', $email_data, TRUE);
        $send_email_result = $this->account_model->send_single_email($email, $message, 'Subscription Notification Mail', 'NO_RESPONSE@1spot.com', "1Spot Media Portal");
    }

    public function cancel_subscription() {

        $id = $_POST['contract_id'];
        $ret = $this->account_model->cancel_subscription($id);
        echo json_encode($ret);
    }
    
    public function update_subscription() {

        $id = $_POST['contract_id'];
        $auto_renew = $_POST['auto_renew'];
        $ret = $this->account_model->update_subscription($id, $auto_renew);
        echo json_encode($ret);
    }

    public function subscription_cancelled() {
        $data = array();
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/subscription_cancelled', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function subscription_finished() {
        $data = array();
        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/subscription_finished', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function update_billing_information() {

        $customer_id = $_SESSION['uvod_user_data']->braintree_id;
        $nonce = $_POST['nonce'];
        $ret = $this->account_model->update_billing_information($customer_id, $nonce);

        echo json_encode($ret);
    }

    public function send_activation_email_login() {

        if (isset($_POST['email'])) {
            $email = $_POST['email'];
            $ret = $this->account_model->get_profile_by_email($email);

            if (isset($ret) && $ret->error == false) {

                $result = $this->send_activation_mail($ret->content[0]->{'pluserprofile$firstName'}, $ret->content[0]->{'pluserprofile$lastName'}, $ret->content[0]->{'pluserprofile$email'}, $ret->content[0]->{'pluserprofile$publicDataMap'}->hash);

                if ($result == true) {
                    $return = array('status' => 'ok', 'message' => 'The activation email was sent to ' . $email);
                } else {
                    $return = array('status' => 'error', 'message' => 'Send Activation email failure');
                }
            }
        }
        echo json_encode($return);
    }

    public function send_activation_email_register() {

        if (isset($_SESSION['registration_data'])) {

            $result = $this->send_activation_mail($_SESSION['registration_data']->first_name, $_SESSION['registration_data']->last_name, $_SESSION['registration_data']->email, $_SESSION['registration_data']->hash);

            if ($result == true) {
                $return = array('status' => 'ok', 'message' => 'The activation email was sent to ' . $_SESSION['registration_data']->email);
            } else {
                $return = array('status' => 'error', 'message' => 'Send Activation email failure');
            }
        } else {
            $return = array('status' => 'session_error');
        }
        echo json_encode($return);
    }

    public function check_status() {

        $status = true;

        if (isset($_SESSION['uvod_user_data']->fb_id)) {

//CHECK IF FACEBOOK SESSION IS ACTIVE
            $fb_session_status = $this->social_media_model->get_fb_profile();

            if ($fb_session_status->status !== 'ok') {
                $status = false;
            }
        }
        if ($status) {

            if (isset($_SESSION['uvod_user_data'])) {

                $id = $this->account_model->get_self_id($_SESSION['uvod_user_data']->token);
                if (isset($id->error) && $id->error) {
                    $status = false;
                }
            }
        }

        if ($status) {
            echo json_encode(array('status' => 'ok'));
        } else {
            $_SESSION['uvod_user_data'] = null;
            unset($_SESSION['uvod_user_data']);
            echo json_encode(array('status' => 'error'));
        }
    }

    public function register_by_facebook() {

        $ret = new stdClass();
        $ret->message = "";

        $fb_profile = $this->social_media_model->get_fb_profile();

        if ($fb_profile->status === 'ok') {
            $fb_email = $fb_profile->content->email;
            if ($this->account_model->exists_user_email($fb_email)) {

                $ret->status = "error";
                $profile = $this->account_model->get_profile_by_email($fb_email);

                if (isset($profile->error) && $profile->error === false) {
                    if (isset($profile->content[0]->{'pluserprofile$publicDataMap'}->fb_id)) {
                        $ret->message = "This Facebook account is already registered in 1spotmedia.";
                    } else {
                        $ret->message = "The email $fb_email is already registered with email and password,<br> you cannot register with your Facebook account.<br> Login using your credentials.";
                    }
                }
            } else {
                $email = $fb_profile->content->email;
                $full_name = explode(' ', $fb_profile->content->name);
                $sizeof_name = sizeof($full_name);
                $first_name = $full_name[0];
                if ($sizeof_name == 1) {
                    $last_name = '';
                } else {
                    $last_name = '';
                    for ($i = 1; $i < ($sizeof_name); $i++) {
                        if ($i > 0) {
                            $last_name .= ' ';
                        }
                        $last_name .= $full_name[$i];
                    }
                }

                $fb_id = $fb_profile->content->id;
                $country = $_POST['country'];
                $register = $this->account_model->register($email, $fb_id, $first_name, $last_name, $country, NULL, $fb_id);

                if (isset($register->error) && $register->error) {
                    $ret->message = $register->message;
                    $ret->status = "error";
                } else {

                    $ret->status = "ok";

                    $current_user = $this->account_model->simple_login($email, $fb_id);

                    if (!$current_user->error) {

                        $_SESSION['registration_data'] = new stdClass();
                        $_SESSION['registration_data']->user_id = $current_user->content->id;
                        $_SESSION['registration_data']->user_token = $current_user->content->token;
                        $_SESSION['registration_data']->profile_id = $register->content->id;
                        $_SESSION['registration_data']->email = $email;
                        $_SESSION['registration_data']->first_name = $first_name;
                        $_SESSION['registration_data']->last_name = $last_name;
                        $_SESSION['registration_data']->country = $country;
                        $_SESSION['registration_data']->method = 'fb';

                        $this->send_welcome_mail($first_name, $last_name, $email);
                    } else {
                        $ret->message = $current_user->message;
                        $ret->status = "error";
                    }
                }
            }
        } else {
            $ret->message = $profile->msg;
            $ret->status = "error";
        }
        echo json_encode($ret);
    }

    public function login_by_facebook() {

        $ret = new stdClass();
        $ret->message = "";

        $profile = $this->social_media_model->get_fb_profile();

        if ($profile->status === 'ok') {
            $email = $profile->content->email;
            $password = $profile->content->id;

            $login = $this->account_model->login($email, $password);

            if (isset($login) && !$login->error) {

                $_SESSION['uvod_user_data'] = $login->content;
                $_SESSION['uvod_user_data']->fb_id = $profile->content->id;
// $_SESSION['copy_data'] = $_SESSION['uvod_user_data'];
                $ret->status = "ok";
            } else {
                $ret->status = "error";
                $profile = $this->account_model->get_profile_by_email($email);

                if (isset($profile->error) && !$profile->error) {
                    if (!isset($profile->content[0]->{'pluserprofile$publicDataMap'}->fb_id)) {

                        $ret->message = "The email $email is already registered with email and password.<br> Login using your credentials.";
                    } else {
                        $ret->message = $login->message;
                    }
                } else {
                    $ret->message = "You Facebook account is not registered in 1SpotMedia. <a class='register_link' href='" . base_url() . 'index.php/account/register_ssl' . "'>Register Now</a> with your Facebook account! ";
                    $ret->status = "error";
                }
            }
        } else {

            $ret->message = $profile->msg;
            $ret->status = "error";
        }
        echo json_encode($ret);
    }

}
