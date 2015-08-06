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
        $amount = '';
        if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
            $amount = $subscription->content->entries[0]->{'plsubscription$billingSchedule'}[0]->{'plsubscription$amounts'}->USD;
        }
        $data['subscription_amount'] = $amount;

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
            $first_name = $full_name[0];
            if (isset($full_name[1])) {
                $last_name = $full_name[1];
            } else {
                $last_name = '';
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

            $ret = $this->account_model->subscription_checkout($token, $nonce, $first_name, $last_name, $email, $country, $pi_month, $pi_year, $pi_type, $pi_number);

            if (isset($ret->error) && $ret->error == false) {
                $this->subscription_complete_mail($first_name, $last_name, $email);
            }

            echo json_encode($ret);
        } else {
            echo json_encode(array('message' => 'Internal Error. Please finish the registration process, then get the subscription in My Account section.'));
        }
    }

    public function register_payment_ssl() {

        $data = array();

        $subscription = $this->account_model->get_subscriptions();

        $amount = '';
        if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
            $amount = $subscription->content->entries[0]->{'plsubscription$billingSchedule'}[0]->{'plsubscription$amounts'}->USD;
        }
        $data['subscription_amount'] = $amount;

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/register_payment', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function register_complete() {
        $data = array();
        $logout = $this->account_model->logout($_SESSION['registration_data']->user_id);

        $this->parser->parse(views_url() . 'templates/header', $data);
        $this->parser->parse(views_url() . 'pages/register_complete', $data);
        $this->parser->parse(views_url() . 'templates/footer', $data);
    }

    public function register_subscription_complete() {
        $data = array();
        $logout = $this->account_model->logout($_SESSION['registration_data']->user_id);

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

        if (!isset($_SESSION['user_data']) || !isset($_SESSION['user_data']->token)) {
            redirect(base_url() . 'index.php/account/signin');
        }

        $data = array();
        $user_profile = $this->account_model->get_profile($_SESSION['user_data']->token);
        $subscription = $this->account_model->get_contract($_SESSION['user_data']->id);

        if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
            $data['subscription_data'] = $subscription->content->entries;

            if ($user_profile && $user_profile->content) {
                if (isset($user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'customer_id'})) {
                    $customer_id = $user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'customer_id'};
                    $_SESSION['user_data']->braintree_id = $customer_id;
                    $customer_data = $this->account_model->get_billing_information($customer_id);

                    if (isset($customer_data) && $customer_data->error == false) {
                        $data['card_name'] = $customer_data->content->card_name;
                        $data['card_number'] = $customer_data->content->card_number;
                        $data['card_expiration_month'] = $customer_data->content->expiration_month;
                        $data['card_expiration_year'] = $customer_data->content->expiration_year;

//                        Braintree_Configuration::environment($this->config->item('braintree_environment'));
//                        Braintree_Configuration::merchantId($this->config->item('braintree_merchantId'));
//                        Braintree_Configuration::publicKey($this->config->item('braintree_publicKey'));
//                        Braintree_Configuration::privateKey($this->config->item('braintree_privateKey'));
//
//                        $data['clientToken'] = Braintree_ClientToken::generate();
                    }
                }
            }
        } else {

            $amount = '';
            $subscription = $this->account_model->get_subscriptions();
            if (isset($subscription->content->entries) && sizeof($subscription->content->entries) > 0) {
                $amount = $subscription->content->entries[0]->{'plsubscription$billingSchedule'}[0]->{'plsubscription$amounts'}->USD;
            }
            $data['subscription_amount'] = $amount;
        }

        if ($user_profile && $user_profile->content) {
            $data['user_first_name'] = $user_profile->content[0]->{'pluserprofile$firstName'};
            $data['user_last_name'] = $user_profile->content[0]->{'pluserprofile$lastName'};
            $data['user_city'] = "";
            if (isset($user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'city'})) {
                $data['user_city'] = $user_profile->content[0]->{'pluserprofile$publicDataMap'}->{'city'};
            }
            $data['user_country'] = $user_profile->content[0]->{'pluserprofile$countryCode'};
            $data['user_postal_code'] = $user_profile->content[0]->{'pluserprofile$postalCode'};
        } else {
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

        $save_profile = $this->account_model->save_profile($_SESSION['user_data']->token, $_SESSION['user_data']->id, $_POST['first_name'], $_POST['last_name'], $_POST['city'], $_POST['country'], $_POST['postal_code']);
        echo json_encode($save_profile);
    }

    public function logout() {

        if (isset($_SESSION['user_data'])) {

            $logout = $this->account_model->logout($_SESSION['user_data']->id);

            if (isset($logout->error) && !$logout->error) {

                $_SESSION['user_data'] = null;
                unset($_SESSION['user_data']);
            }
        }

        redirect(base_url());
    }

    public function login() {

        if (isset($_POST['email']) && isset($_POST['password'])) {

            $login = $this->account_model->login($_POST['email'], $_POST['password']);

            if (isset($login) && !$login->error) {
                $_SESSION['user_data'] = $login->content;

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
            $ret = $this->account_model->change_password($_SESSION['user_data']->username, $_POST['current_password'], $_POST['new_password']);
        }

        echo json_encode($ret);
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

    public function activate_account() {
        $data = array();
        $done = $this->account_model->activate_account($_GET['hash'], $_GET['email']);
        if ($done) {
            $data['message1'] = "ACCOUNT ACTIVE!";
            $data['message2'] = "Your account was activated successfully.";
            $data['message3'] = "Now you can proceed with the login.";
        } else {
            $data['message1'] = "ERROR";
            $data['message2'] = "The activation process found an error.";
            $data['message3'] = "Please try again later.";
        }
        $this->load->view(views_url() . 'templates/header', $data);
        $this->load->view(views_url() . 'pages/account_active', $data);
        $this->load->view(views_url() . 'templates/footer', $data);
    }

    public function subscribe_ssl() {

        if (isset($_SESSION['user_data'])) {
            $token = $_SESSION['user_data']->token;
        } else if (isset($_SESSION['registration_data']->user_token)) {
            $token = $_SESSION['registration_data']->user_token;
        }

        if (isset($_POST['nonce'])) {
            $nonce = $_POST['nonce'];
        } else {
            $nonce = '';
        }

        $first_name = $_SESSION['user_data']->firstName;
        $last_name = $_SESSION['user_data']->lastName;
        $email = $_SESSION['user_data']->email;
        $city = '';
        $postal_code = '';
        $country = $_SESSION['user_data']->countryCode;
        $pi_month = $_POST['pi_month'];
        $pi_year = $_POST['pi_year'];
        $pi_type = $_POST['pi_type'];
        $pi_number = $_POST['pi_number'];

        $ret = $this->account_model->subscription_checkout($token, $nonce, $first_name, $last_name, $email, $city, $postal_code, $country, $pi_month, $pi_year, $pi_type, $pi_number);

        if (isset($ret->error) && $ret->error == false) {
            $this->subscription_complete_mail($first_name, $last_name, $email);
        }

        echo json_encode($ret);
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

        $customer_id = $_SESSION['user_data']->braintree_id;
        $nonce = $_POST['nonce'];
        $ret = $this->account_model->update_billing_information($customer_id, $nonce);

        echo json_encode($ret);
    }

    public function check_status() {

        if (isset($_SESSION['user_data'])) {

            $id = $this->account_model->get_self_id($_SESSION['user_data']->token);
            //CHECK IF FACEBOOK SESSION IS ACTIVE
            $fb_session_status = $this->social_media_model->get_fb_profile();

            if (isset($id->error) && $id->error || $fb_session_status->status === 'error') {

                $_SESSION['user_data'] = null;
                unset($_SESSION['user_data']);
                echo json_encode(array('status' => 'error'));
            }
        } else {
            echo json_encode(array('status' => 'ok'));
        }
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

    public function register_by_facebook() {

        $ret = new stdClass();
        $ret->message = "";

        $profile = $this->social_media_model->get_fb_profile();

        if ($profile->status === 'ok') {

            if ($this->account_model->exists_user_email($profile->content->email)) {
                $ret->message = "Your Facebook's email already exists<br> in our system.";
                $ret->status = "error";
            } else {
                $email = $profile->content->email;
                $name_array = explode(' ', $profile->content->name);
                if (isset($name_array[1])) {
                    $last_name = $name_array[1];
                } else {
                    $last_name = '';
                }

                $fb_id = $profile->content->id;
                $country = $_POST['country'];
                $register = $this->account_model->register($email, $fb_id, $name_array[0], $last_name, $country, NULL, $fb_id);

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
                        $_SESSION['registration_data']->first_name = $name_array[0];
                        $_SESSION['registration_data']->last_name = $last_name;
                        $_SESSION['registration_data']->country = $country;
                        $_SESSION['registration_data']->method = 'fb';
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
                $_SESSION['user_data'] = $login->content;
                $ret->status = "ok";
            } else {
                $ret->status = "error";
                $ret->message = $login->message;
            }
        } else {
            $ret->message = $profile->msg;
            $ret->status = "error";
        }
        echo json_encode($ret);
    }

}
