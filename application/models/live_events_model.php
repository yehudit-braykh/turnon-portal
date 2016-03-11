<?php

class Live_events_model extends CI_Model {

    public function __construct() {
        $this->load->helper('uvod_api');
    }

    public function get_next_event() {
        return apiCall("event/get_next_event");
    }

    public function get_event_products($ids) {
        return apiCall("event/get_event_products", array('products_id' => $ids));
    }

    public function list_simple_events() {
        return apiCall("event/list_simple_events", array());
    }
    
    public function get_event_data() {
        return apiCall("event/get_event_data", array());
    }

    public function get_events() {
        return apiCall("event/get_event_data");
    }

    public function get_orders($id) {

        return apiPost("event/get_orders", array('id' => $id));
    }

    public function get_orders_item($id) {

        return apiPost("event/get_orders_item", array('id' => $id));
    }

    public function subscription_checkout($product_id, $token, $nonce, $first_name, $last_name, $email, $city, $postal_code, $country, $pi_month, $pi_year, $pi_type, $pi_number, $pi_security_code) {

        return apiPost("event/event_subscription_checkout", array('product_id' => $product_id, 'token' => $token, 'nonce' => $nonce, 'first_name' => $first_name, 'last_name' => $last_name,
            'email' => $email, 'city' => $city, 'postal_code' => $postal_code, 'country' => $country, 'pi_month' => $pi_month, 'pi_year' => $pi_year, 'pi_type' => $pi_type, 'pi_number' => $pi_number, 'pi_security_code' => $pi_security_code));
    }

}

?>