           <link rel="stylesheet" type="text/css" href="<?php echo asset_url(); ?>css/temp.css" />

<?php
if (isset($events->content) && sizeof($events->content) > 0) {
    $data = $events->content[0];
    ?>
    <div class="jumbotron">
        <div id="event-left-column" class="col-md-4">
            <div class="event-detail-img"></div>
        </div>
        <div id="event-right-column" class="col-md-8">
            <div class="event-detail-title"></div>
            <div class="event-detail-subtitle"></div>
            <div class="event-detail-description"></div>
            <div class="event-detail-result"></div>
        </div>
    </div>
    <?php
}
?>