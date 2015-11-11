</div>
</div>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">


<script>
   

    function dropdown_click_callback(control_id, value) {
        window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>/' + $('#' + control_id).val();
    }

    $(document).ready(function() {

        $("#start_date_datepicker").datepicker();
        $("#start_date_datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
        $("#end_date_datepicker").datepicker();
        $("#end_date_datepicker").datepicker("option", "dateFormat", "yy-mm-dd");

        $(document).on('click', '#dropdown_btn_start', function() {
            $('#start_date_datepicker').focus();
        });
        $(document).on('click', '#dropdown_btn_end', function() {
            $('#end_date_datepicker').focus();
        });

        $(document).on('click', '.button_search_date', function() {
            $(this).children('input').focus();
        });

        $(document).on('change', '#end_date_datepicker', function() {
            if ($('#start_date_datepicker').val() != '') {

                startDate_tmp = $('#start_date_datepicker').val();
                endDate_tmp = $('#end_date_datepicker').val();

                window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>/' + startDate_tmp + '/' + endDate_tmp;
            }
        });

        $(document).on('change', '#start_date_datepicker', function() {
            $('#end_date_datepicker').removeAttr('disabled');

        });

        $(document).on('blur', '#start_date_datepicker', function() {
            if ($(this).val() == '') {
                $('#end_date_datepicker').attr('disabled', 'disabled');
            }
        });
        
        $(document).on('click','#clear_btn',function(){
             window.location.href = '<?php echo base_url(); ?>index.php/vod/section/<?php echo $sub_section1; ?>';
        });
    });

</script>


<!-- content -->

        <div class="container-fluid header_vodlist">
            <h2 class="vod_list_header_title"><?php echo $category; ?></h2>
        </div>  

        <div class="container-fluid standard_cont">

            <div class="col-sm-12">

            <div class="col1-vodlist">

                <div class="category_filter_container">
                    <h5>Filter:</h5>

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
  
                            <div>
                                
                                <div class="button_search_date">
                                    <input class="sort_datepicker" type="text" id="start_date_datepicker" placeholder="Start date" >
                                    <span class="caret" id="dropdown_btn_start"></span>
                                </div>
                                <div class="button_search_date">
                                    <input class="sort_datepicker" type="text" id="end_date_datepicker" placeholder="End date" disabled="disabled">
                                    <span class="caret" id="dropdown_btn_end"></span>
                                </div>
                                <button id="clear_btn" type="submit" class="btn btn-default btn-xs">reset search</button>
                            </div>

                        <?php } ?> 

                    </div>

                </div>
                <div class="col2-vodlist">
                    <div class="category_items_container">{items_category_1}</div>
                </div>

            </div>

        </div>

<!-- /content -->
