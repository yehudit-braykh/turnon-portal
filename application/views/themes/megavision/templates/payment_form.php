<input type="text" name="card_number" id="prevent_autofill" value="" style="display:none;" />
<input type="password" name="security_code" id="password_fake" value="" style="display:none;" />
<li> 
    <p id="info" class="form_info"></p>
</li>

<li>
    <input id="cardholder_name" placeholder="Titular de la Tarjeta de Crédito" class="text" />
</li>

<li>

    <input id="card_number" name="card_number" value="" placeholder="Número de Tarjeta" class="text"/>
</li>

<li>
    <input id="security_code" name="security_code" value="" placeholder="Código de Seguridad" class="text" type="password"/>
</li>

<li>
    <div id="title_expiration">Fecha de vencimiento::</div> 
    <div id="expiration_date"> 

        <span class='css-select-moz'>
            <select id="expiration_month" class="text" style="width:70px;">
                <option id="01">01</option>
                <option id="01">02</option>
                <option id="01">03</option>
                <option id="01">04</option>
                <option id="01">05</option>
                <option id="01">06</option>
                <option id="01">07</option>
                <option id="01">08</option>
                <option id="01">09</option>
                <option id="01">10</option>
                <option id="01">11</option>
                <option id="01">12</option>
            </select>
        </span>

        <span class='css-select-moz'>
            <select id="expiration_year" class="text" style="width:70px;">
                <option id="2016">2016</option>
                <option id="2017">2017</option>
                <option id="2018">2018</option>
                <option id="2019">2019</option>
                <option id="2020">2020</option>
                <option id="2021">2021</option>
                <option id="2022">2022</option>
                <option id="2023">2023</option>
                <option id="2024">2024</option>
                <option id="2025">2025</option>
            </select>
        </span> 

    </div>
    <div id="label_select"><label for="expiration_month">Mes*</label><label for="expiration_year">Año*</label></div>
</li>

<li id= "terms_and_conditions">
    <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
    <div style="display: inline-block;"><a href="<?php echo base_url() . 'index.php/static_content/terms_conditions'; ?>" target="_blank" class="terms_and_conditions">Aceptar Términos y Condiciones</a></div>
</li>

<script type="text/javascript">
    $(function () {
        var passElem = $("input#security_code");
        passElem.focus(function () {
            passElem.prop("type", "password");
        });
    });
</script>