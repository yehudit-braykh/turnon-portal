</div>
</div>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">


<script>


    function dropdown_click_callback(control_id, value) {
        window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>/' + $('#' + control_id).val();
    }

    $(document).ready(function () {

        $("#start_date_datepicker").datepicker();
        $("#start_date_datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
        $("#end_date_datepicker").datepicker();
        $("#end_date_datepicker").datepicker("option", "dateFormat", "yy-mm-dd");

        $(document).on('click', '#dropdown_btn_start', function () {
            $('#start_date_datepicker').focus();
        });
        $(document).on('click', '#dropdown_btn_end', function () {
            $('#end_date_datepicker').focus();
        });

        $(document).on('change', '#end_date_datepicker', function () {
            if ($('#start_date_datepicker').val() != '') {

                startDate_tmp = $('#start_date_datepicker').val();
                endDate_tmp = $('#end_date_datepicker').val();

                window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>/' + startDate_tmp + '/' + endDate_tmp;
            }
        });

        $(document).on('change', '#start_date_datepicker', function () {
            $('#end_date_datepicker').removeAttr('disabled');

        });

        $(document).on('blur', '#start_date_datepicker', function () {
            if ($(this).val() == '') {
                $('#end_date_datepicker').attr('disabled', 'disabled');
            }
        });

        $(document).on('click', '#clear_btn', function () {
            window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>';
                    });
                });

</script>

<div class="header_resize2">

    <div class="resize"> 
        <!-- content -->
        <div class="content" id="gallery">
            <div class="content_resize">
                
                <div class="container-fluid">
                    <div class="category_filter_container">

                        <?php
                        $filter = '';
                        $show_filter = 'yes';

                        foreach ($vod_categories as $value) {
                            if ($value->id == $sub_section1) {
                                $filter = $value->filter_field;
                            }
                        }

                        if ($this->config->item('show_' . $filter . '_filter') !== FALSE)
                            $show_filter = $this->config->item('show_' . $filter . '_filter');

                        if ($show_filter == 'yes' && $filter == 'genre') {
                            ?>

                            <!-- Genre Filter -->
                            <select id="category_filter" class="turnintodropdown">
                                <option value="<?php echo $selected_category_id; ?>"><?php echo $selected_category_text; ?></option>
                                <?php for ($i = 0; $i < sizeof($genres); $i++) { ?>
                                    <option value="<?php echo $genres[$i]->id; ?>" >
                                        <?php echo $genres[$i]->description; ?>
                                    </option>
                                <?php } ?>
                            </select>

                        <?php } else if ($show_filter == 'yes' && $filter == 'aired_date') { ?>

                            <div style="width:100%; height: 40px;">
                                <input class="sort_datepicker" type="text" id="start_date_datepicker" placeholder="START DATE" ><div id="dropdown_btn_start" class="dropdown_btn"></div>
                                <input class="sort_datepicker" type="text" id="end_date_datepicker" placeholder="END DATE" disabled="disabled"><div id="dropdown_btn_end" class="dropdown_btn"></div>
                                <div id="clear_btn"></div>
                            </div>

                        <?php } ?> 

                    </div>

                    <div class="category_items_container" style="min-height: 600px;">{items_category_1}</div>
                    <div class="clr"></div>
                </div>
                <div class="clr"></div>
            </div>
            <div class="clr"></div>
        </div>
        <!-- /content -->
