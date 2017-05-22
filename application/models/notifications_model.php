<?php
class Notifications_model extends Uvod_Model {

	public function __construct(){
		$this->load->helper('uvod_api');
        $this->load->library('session');
		$this->load->model('video_model');
		$this->load->model('account_model');
	}

	public function get_notifications(){
        $id = $this->session->userdata("profile_id");
        $token = $this->session->userdata("login_token");

		if(!$id || !$token){
			return ;
		}
		
		// sets the method parameters
		$notification_params = array();
		$notification_params[] = 'byUserId=null{null}|' . $id;
		$notification_params[] = 'sort=added:-1';

		$notifications = $this->apiCall('notification', $notification_params);

		$profile = $this->account_model->get_profile($token, $id);
        $notifications_obj = $notifications->entries;
        if (isset($profile->readNotifications) && sizeof($profile->readNotifications) > 0) {

            for ($i = 0; $i < sizeof($notifications_obj); $i++) {
                $notifications->entries[$i]->read = false;

                for ($l = 0; $l < sizeof($profile->readNotifications); $l++) {

                    if ($notifications_obj[$i]->_id === $profile->readNotifications[$l]->id) {

                        $notifications->entries[$i]->read = true;
                        break;
                    }
                }
            }
        } else {
            for ($i = 0; $i < sizeof($notifications->entries); $i++) {
                $notifications->entries[$i]->read = false;
            }
        }

		//$data =  apiCall("notification/get_user_notifications", array("id" => $id, "token" => $token));
		//debug($notifications);
		foreach($notifications->entries as $row){

		//	debug($row->updatedByUserId);
		if($row->video)
			$row->video = $this->video_model->get_video_by_id($row->video);
		}
		return $notifications->entries;
	}

    public function mark_as_read($data){
        $id = $this->session->userdata("profile_id");
        $token = $this->session->userdata("login_token");

		// sets the method parameters
        $parameters = array();
        $parameters[] = 'byId=' . $id;

        $profile = $this->account_model->get_profile($token, $id);

        $payload = new stdClass();
        if (isset($profile->readNotifications) && sizeof($profile->readNotifications) > 0) {

            $notifications = $profile->readNotifications;

            for ($i = 0; $i < sizeof($notifications_id); $i++) {

                $exist = false;
                for ($l = 0; $l < sizeof($notifications); $l++) {
                    error_log('NOTIFICATION: ' . $notifications_id[$i] . " PROFILE NOTIFICATION: " . $notifications[$l]->id);
                    if ($notifications_id[$i] == $notifications[$l]->id) {
                        error_log('son iguales');
                        $exist = true;
                        break;
                    }
                }
                if (!$exist) {
                    $readed_notification = new stdClass();
                    $readed_notification->id = $notifications_id[$i];
                    $readed_notification->date = time() . '000';

                    array_push($profile->readNotifications, $readed_notification);
                }
            }

            $payload->readNotifications = $profile->readNotifications;
        } else {
            $payload->readNotifications = array();
            for ($i = 0; $i < sizeof($notifications_id); $i++) {
                $readed_notification = new stdClass();
                $readed_notification->id = $notifications_id[$i];
                $readed_notification->date = time() . '000';

                array_push($payload->readNotifications, $readed_notification);
            }
        }

        $update_profile = $this->account_model->update_profile($id, array("readNotifications" => $payload->readNotifications));

        return $update_profile;
	}

}
?>
