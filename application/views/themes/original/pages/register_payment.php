<script type="text/javascript">

  $(function () {

    $('#btn_skip').on('click', function(event) {
      event.preventDefault();
      window.location.href = "<?php echo base_url(); ?>index.php/account/register_complete";
    });

    $('#btn_next').on('click', function(event) {
      event.preventDefault();

      $.ajax({
        url: "<?php echo base_url(); ?>index.php/account/register_step3",
        type: 'POST',
        dataType: 'json',
        data: $('#registerform').serialize()
      }).done(function(data) {

        if (data.message == 'ok') {
          window.location.href = "<?php echo base_url(); ?>index.php/account/register_complete";

        } else {

          TweenLite.fromTo("#info", 1, {alpha:0}, {alpha:1, onComplete: function() {
            TweenLite.to("#info", 1, {delay:6, alpha:0});
          }});
          $("#info").html("* " + data.message);

        }
      });
    });
  });
</script>

            <div class="now_page_resize">
              <h1 style="color:rgb(233,50,50); text-align: left;">Want to become a Subscriber?<br /><span>Enter your payment information</span></h1>
              <div class="clr"></div>
            </div>

            <div class="clr"></div>
            <div style="">
              <form method="post" id="registerform" style="width:400px;height:600px;">
                <ol>
                  <li>
                    <label for="name_card">Name on card*</label>
                    <input id="name_card" name="name_card" class="text"/>
                  </li>
                  <li>
                    <label for="card_number">Card number*</label>
                    <input id="card_number" name="card_number" class="text"/>
                  </li>
                  <li>
                    <label for="security_code">Security Code*</label>
                    <input id="security_code" name="security_code" class="text" type="password" />
                  </li>
                  <li>
                    <label for="month">Month*</label>
                    <select id="month" name="month" class="text" style="width:70px;">
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
                  </li>
                  <li>
                    <label for="year">Year*</label>
                    <select id="year" name="year" class="text" style="width:70px;">
                      <option id="2014">2014</option>
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
                  </li>
                  <li> 
                    <p id="info" style="color:#fff;text-align:center;margin-left:120px;">&nbsp;</p>
                  </li>
                  <li class="buttons">
                    <input type="image" id="btn_next" src="<?php echo base_url(); ?>/assets/images/button_next.png" class="send" style="margin-left:10px;" />
                    <input type="image" id="btn_skip" src="<?php echo base_url(); ?>/assets/images/button_skip.png" class="send" style="margin-left:10px;" />
                    <div class="clr"></div>
                  </li>
                </ol>
              </form>              
            </div>
            <div class="clr"></div>
          </div>
          <!-- /content -->