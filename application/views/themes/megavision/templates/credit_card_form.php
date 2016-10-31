<input type="text" name="card_number" id="prevent_autofill" value="" style="display:none;" />
<input type="password" name="security_code" id="password_fake" value="" style="display:none;" />
<div class="registration_subtitle_payment">Ingrese su información de pago</div>
<ol>
    <li>
        <label for="cardholder_name">Titular de la Tarjeta de Crédito*</label>
        <input id="cardholder_name" class="text" />
    </li>
    <li> 
        <div class="form_notes">Ingrese su Nombre exactamente como aparece <br class="rwd-break"> en su Tarjeta de Crédito.</div>
    </li>        
    <li>
        <label for="card_number">Número de Tarjeta*</label>
        <input id="card_number" class="text" style="width:150px;" />
    </li>
    <li> 
        <div class="form_notes">Ingrese su Número de Tarjeta de Crédito sin espacios.</div>
    </li>        
    <li>
        <label for="security_code">Código de Seguridad*</label>
        <input id="security_code" class="text" type="password" style="width:70px;" />
    </li>
    <li> 
        <div class="form_notes">Ingrese su Código de Seguridad.</div>
    </li>        
    <li>
        <label for="expiration_month">Mes*</label>
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
    </li>
    <li> 
        <div class="form_notes">Seleccione el Mes de vencimiento de la Tarjeta.</div>
    </li>        
    <li>
        <label for="expiration_year">Año*</label>
        <span class='css-select-moz'>
            <select id="expiration_year" class="text" style="width:85px;">
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
    </li>
    <li> 
        <div class="form_notes">Seleccione el Año de vencimiento de la Tarjeta.</div>
    </li>


<script type="text/javascript">
    $(function(){  
        var passElem = $("input#security_code");
        passElem.focus(function() { 
            passElem.prop("type", "password");                                             
        });
    });
</script>