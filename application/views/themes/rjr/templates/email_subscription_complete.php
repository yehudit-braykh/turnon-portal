<div style="font-family: calibri,sans-serif;">
    <h4>Dear <?php echo $name . ' ' . $surname; ?></h4>
<?php 
if(intval($duration) > 1){
    $month_text = 'months';
    $renewal_txt = 'those '.$duration. ' months';
}else{
    $month_text = 'month';
    $renewal_txt = 'these month';
}

if($auto_renew){
    $auto_renew_txt = '<b>Renewal</b> - The price is valid for the full '.$duration.' '.$month_text.' of your contract. You setted your subscription as auto renewal, so after '.$renewal_txt.', we will renew your contract automatically, for the same period. If you wish to set your subscription as not auto-renewal, you can do this on 1spotmedia web site'; 
}else{
    $auto_renew_txt = '<b>Renewal</b> - The price is valid for the full '.$duration.' '.$month_text.' of your contract. You setted your subscription as not auto renewal, so after '.$renewal_txt.', we will cancel your contract automatically. If you wish to set your subscription as auto-renewal, you can do this on 1spotmedia web site'; 
}
?>
    <p>Welcome to the 1spotmedia.com family.  Your subscription was successful. Your contract is for <?php echo $duration. ' '. $month_text;?>.</p>
    <p><?php echo $auto_renew_txt;?></p>
    
    <p>Should you have any questions or concerns, please feel to contact us by email at support@1spotmedia.com or access the HELP icon on our 1spotmedia.com site.</p>
    <p>We hope you enjoy the 1spotmedia.com experience.</p>
    <p>
        Sincerely,<br> 
        The 1spotmedia.com Team<br> 
        <br>

        <span style="font-size: 12px">Please do not reply to this message; it was sent from an unmonitored email address.</span><br> 

    </p>
</div>