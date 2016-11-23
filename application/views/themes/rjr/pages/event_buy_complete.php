</div>
</div>

<!-- content -->


<div class="container-fluid form_cont" style="text-align: center;">

    <div class="complete_title">Your payment was accepted succesfully!</div>
    <button id="purchased_ticket_btn" class="btn-default">Click here to see your purchased ticket(s)</button>
    <div class="clr"></div>

</div>

<script>

    $(document).ready(function () {
        $("#purchased_ticket_btn").on('click',function(){
             window.location.href = "<?php echo base_url() . 'index.php/account/my_account_ssl#tab4'; ?>";
        });
       
    });
</script>


<!-- /content -->