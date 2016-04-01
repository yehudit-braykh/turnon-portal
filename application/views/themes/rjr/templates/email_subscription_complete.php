<div style="font-family: calibri,sans-serif;">
    <h4>Dear <?php echo $name . ' ' . $surname; ?></h4>
    <?php
    if (intval($duration) > 1) {
        $month_text = 'months';
    } else {
        $month_text = 'month';
    }
    ?>

    <p>Welcome to the 1spotmedia.com family. Your subscription was successful. Your contract is for <?php echo $duration . ' ' . $month_text; ?>.</p>
    <?php

    if ($auto_renew === 'true' || $auto_renew === TRUE) {

        ?>
        <p>Renewal - The price is valid for the full month of your contract. You selected your subscription for the auto renewal option, therefore  <?php echo $duration; ?> month(s), 
           we will renew your contract and bill you automatically, for the same period. If you wish to change your subscription to not auto-renew, simply uncheck that option on the 
           1spotmedia web site.
        </p>

        <?php
    }
    ?>
    <p>Should you have any questions, please feel to contact us by email at support@1spotmedia.com or access the HELP icon on our 1spotmedia.com site.</p>
    <p>We hope you enjoy the 1spotmedia.com great live streaming and original Jamaican content.</p>
    <p>
        Sincerely,<br> 
        The 1spotmedia.com Team<br> 
        <br>
    </p>
    <span style="font-size: 12px">Please do not reply to this message; it was sent from an unmonitored email address.</span><br>
</div>