<?php

//require_once("database.php");
//require_once("general.php");

 /*
 * Class User: Host user information
 * Author: Sebastian Acevedo
 */
class UVODUser
{
	public $id;
	public $username;
	public $firstName;
	public $lastName;
	public $gender;
	public $birthdate;
	public $countryCode;
	public $email;
	public $avatar;
	public $token;
	public $duration;
	public $idle_timeout;

	public $purchased_products;
	public $subscription;

	function logout($username, $current_ip) {

		openConnection();

		// updates login information
		$query = "UPDATE access_control SET status = 'closed' WHERE username = '" . $username . "' and source_ip = '" . $current_ip . "'";
		executeQuery($query);

		return true;
	}

	function check_login_concurrence($current_ip) {

		openConnection();

		// checks in db if a register exists for this user
		$query  = "SELECT * FROM access_control WHERE username = '" . $this->username . "' and status = 'open' ORDER BY access_time DESC LIMIT 0, 1";
		$result = executeQuery($query);

		// if there is a record for this user
		if (mysql_num_rows($result) > 0) {
			while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {

				// checks the source ip
				if ($current_ip != $row['source_ip']) {
					throw new Exception('User already loged in from a different computer.');
				} else {

					// updates login information
					$query = "UPDATE access_control SET status = 'closed' WHERE username = '" . $this->username . "' and source_ip = '" . $current_ip . "'";
					executeQuery($query);
					$query = "INSERT INTO access_control (username, access_time, token, source_ip, status) values ('" . $this->username . "'," . time() . " , '" . $this->token . "', '" . $current_ip . "', 'open')";
					executeQuery($query);

					return true;
				}
			}
		} else {

			// updates login information
			$query = "INSERT INTO access_control (username, access_time, token, source_ip, status) values ('" . $this->username . "'," . time() . " , '" . $this->token . "', '" . $current_ip . "', 'open')";
			executeQuery($query);

			return true;
		}
	}
}
