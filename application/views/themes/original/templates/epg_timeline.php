<script>

    base_url = "<?php echo base_url(); ?>";

</script>
<script type="text/javascript" src="<?php echo asset_url(); ?>js/features/live_epg.js"></script>



<!--<div id="epg_arrow_left"></div>
<div id="epg_scroller">




    <div id="epg_data_container">


    </div>
</div>
<div id="epg_arrow_right"></div>-->


<script type="text/javascript">

    function get_current_time() {
        dat = new Date();
        hs = dat.getHours();
        min = dat.getMinutes();
        hour = (hs + (min / 60)) * 60;

        return hour;
    }
    epg_array = new Array();
<?php
$i = 0;

?>


<?php
if (isset($epg->content->entries)) {
    foreach ($epg->content->entries as $value) {
        ?>

            entries = new Array();
        <?php
        $h = 1;


        echo
        "var program$h = new Object();"
        . "program$h.title = \"" . $value->program->title . "\";"
        . "program$h.description = '" . $value->program->description . "';"
        . "program$h.start_time = " . ($value->{'pllisting$startTime'}) . ";"
        . "program$h.end_time = " . ($value->{'pllisting$endTime'}) . ";"
        . "entries.push(program$h);";

        echo "epg_array[$i] = entries;";
        $i++;
    }
}
?>

    var test_channels = new Object();
    test_channels.entries = new Array();

<?php
if ($channels && isset($channels->entries)) {
    for ($i = 0; $i < sizeof($channels->entries); $i++) {
        echo "test_channels.entries.push({title: '" . $channels->entries[$i]->title . "'});";
    }
}
?>
    hour = get_current_time();
    draw_epg(test_channels, epg_array, 0, hour);
    $(document).on('change', '#datepicker', function() {
        $.ajax({
            url: "<?php echo base_url() . 'index.php/live/epg_timeline'; ?>",
            type: 'POST',
            data: 'date=' + $('#datepicker').val(),
            beforeSend: function() {
                marginTop = (parseInt($('#epg_scroller').height()) - 50) / 2;

                $('#epg_scroller').html('<div id="loadingIcon"></div>');
                $('#loadingIcon').css('margin-top', marginTop + "px");
            },
            success: function(data) {
               
                $('#epg_timeline').html(data);

            }
        });


    })

    $("#epg_arrow_left").bind("click", function(event) {
        event.preventDefault();
        if ($("#epg_data_container").offset().left + step > 0) {
            $("#epg_data_container").animate({
                left: "0px"
            });
        } else {
            $("#epg_data_container").animate({
                left: "+=" + step + "px"
            });
        }
    }).bind("mouseover", function(event) {
        scrolling = true;
        scrollContent_h("left", 'epg_data_container');
    }).bind("mouseout", function(event) {
        scrolling = false;
    });
    $("#epg_arrow_right").bind("click", function(event) {
        event.preventDefault();
        if ($("#epg_data_container").offset().left - step < -1 * ($("#epg_data_container").width() - 700)) {
            $("#epg_data_container").animate({
                left: (-1 * ($("#epg_data_container").width() - 700)) + "px"
            });
        } else {
            $("#epg_data_container").animate({
                left: "-=" + step + "px"
            });
        }
    }).bind("mouseover", function(event) {
        scrolling = true;
        scrollContent_h("right", 'epg_data_container');
    }).bind("mouseout", function(event) {
        scrolling = false;
    });
    $("#epg_arrow_left").bind("click", function(event) {
        event.preventDefault();
        if ($("#epg_data_container").offset().left + step > 0) {
            $("#epg_data_container").animate({
                left: "0px"
            });
        } else {
            $("#epg_data_container").animate({
                left: "+=" + step + "px"
            });
        }
    }).bind("mouseover", function(event) {
        scrolling = true;
        scrollContent_h("left", 'epg_data_container');
    }).bind("mouseout", function(event) {
        scrolling = false;
    });
    $("#epg_arrow_right").bind("click", function(event) {
        event.preventDefault();
        if ($("#epg_data_container").offset().left - step < -1 * ($("#epg_data_container").width() - 700)) {
            $("#epg_data_container").animate({
                left: (-1 * ($("#epg_data_container").width() - 700)) + "px"
            });
        } else {
            $("#epg_data_container").animate({
                left: "-=" + step + "px"
            });
        }
    }).bind("mouseover", function(event) {
        scrolling = true;
        scrollContent_h("right", 'epg_data_container');
    }).bind("mouseout", function(event) {
        scrolling = false;
    });
    var epg_offset = $('#epg_data_container').offset().left;

    desp = get_current_time();
    $("#epg_data_container").animate({
        left: (-1 * desp * 6.6 + 200) + "px"
    });
</script>

