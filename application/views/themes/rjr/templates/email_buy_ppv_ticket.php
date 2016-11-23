
<div style="width: 100%;height: auto;">
    <img src="<?php echo asset_url(); ?>images/<?php echo $this->config->item('logo_file'); ?>"/>
</div>
<p style="float: right">ORDER CONFIRMATION</p>
<br>
<p>Hello <?php echo $fullname; ?></p>
<?php 
if(isset($order->content->_id)){
    $order_id = $order->content->_id;
}else{
    $order_id = "";
}

?>
<p>Thanks for shopping with us. Your confirmation number is <?php  echo $order_id; ?></p>
<br>
<span>We hope to see you again soon.</span>
<br>

<span><b>1spotmedia.com </b></span>

