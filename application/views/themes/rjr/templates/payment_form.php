<li> 
    <p id="info" class="form_info"></p>
</li>

<li>
    <input id="cardholder_name" placeholder="Name on card" class="text" />
</li>

<li>
    <input id="card_number" name="card_number" placeholder="Credit card number" class="text" autocomplete="off"/>
</li>

<li>
    <input id="security_code" name="security_code" placeholder="Security code" class="text" type="password" autocomplete="off"/>
</li>
 
<li>
    <div id="title_expiration">Expiration date:</div> 
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
                <option id="2015">2015</option>
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
    <div id="label_select"><label for="expiration_month">Month*</label><label for="expiration_year">Year*</label></div>
</li>

<li id= "terms_and_conditions">
    <div style="display: inline-block;"><input id="accept_terms_and_conditions" type="checkbox" /></div>   
    <div style="display: inline-block;"><a href="<?php echo base_url() . 'index.php/static_content/terms_conditions'; ?>" target="_blank" class="terms_and_conditions">Accept Terms and Conditions</a></div>
</li>
