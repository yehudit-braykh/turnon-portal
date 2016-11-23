</div>
</div>

<!-- content -->


<div class="container-fluid form_cont" style="text-align: center;">

    <div class="complete_title">Su pago se aceptó con éxito!</div>
    <button id="purchased_ticket_btn" class="btn-default">Haga click aquí para ver los boletos comprados</button>
    <div class="clr"></div>

</div>

<script>

    $(document).ready(function () {
        $("#purchased_ticket_btn").on('click',function(){
             window.location.href = "<?php echo base_url() . 'index.php/account/my_account_ssl#tab3'; ?>";
        });
       
    });
</script>


<!-- /content -->