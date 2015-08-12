<?php
if (isset($events->content) && sizeof($events->content) > 0) {
    $data = $events->content[0];
    ?>
    <div class="jumbotron">
        <div id="event-left-column" class="col-md-4">
            
        </div>
        <div id="event-right-column" class="col-md-8"></div>
    </div>
    <?php
}
?>