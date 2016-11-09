<script type="text/javascript">

    $(function () {

        $('#btn_reset_password').on('click', function (event) {
            event.preventDefault();
            if ($('#rest_password_input').val() !== $('#confirm_reset_pass').val()) {
                $("#info").html("La Contraseña y la confirmación no coinciden");
                TweenLite.fromTo("#info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                        TweenLite.to("#reset_info", 1, {delay: 6, alpha: 0});
                    }});
                return false;
            }
            

            $(this).hide();
            $('#forgot_preloader').show();
            $('#forgot_preloader').html('Enviando email...');

            $.ajax({
                url: "<?php echo base_url(); ?>index.php/account/reset_password",
                type: 'POST',
                dataType: 'json',
                data: "new_password=" + $('#rest_password_input').val()
            }).done(function (data) {
                if (data.message == 'ok') {
                    window.location.href = '<?php echo base_url(); ?>';
                } else {
                    TweenLite.fromTo("#forgot_preloader", 1, {alpha: 1}, {alpha: 0, onComplete: function () {
                            TweenLite.to("#forgot_preloader", 1, {delay: 6, alpha: 0});
                        }});
                    $('#btn_reset_password').show();
                    TweenLite.fromTo("#reset_info", 1, {alpha: 0}, {alpha: 1, onComplete: function () {
                            TweenLite.to("#reset_info", 1, {delay: 6, alpha: 0});
                        }});
                    $("#reset_info").html("* " + data.message);
                }

            });

        });

    });
</script>

<form  id="reset_password_form" style="width:350px;display:none;margin-left:auto;margin-right:auto;">
    <div class="form_subtitle">Su contraseña ha caducado y debe cambiarse</div>
    <ol>
        <li>
            <label for="reset_pass_input">Nueva Contraseña</label>
            <input id="rest_password_input" name="reset_pass_input" class="text" type="password" required="required"/>
        </li>

        <li>
            <label for="confirm_reset_pass">Confirmar Nueva Contraseña</label>
            <input id="confirm_reset_pass" name="confirm_reset_pass" class="text" type="password" required="required"/>
        </li>

        <li class="buttons">
            <button  id="btn_reset_password" class="send">CONFIRMAR</button>
            <div id="forgot_preloader"></div>
            <div class="clr"></div>
        </li>
        <li> 
            <span id="reset_info" class="form_info">&nbsp;</span>
        </li>
    </ol>
</form>              
</div>
<div class="clr"></div>
</div>
<!-- /content --><?php
