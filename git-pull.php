<?php
    chdir("/var/www/repos/clixtv-frontend-portal");
    exec("git pull", $results);
    echo(implode("\n",$results));
    echo "<h3 align = center> Succesfully commited all files.</h3>";
 ?>
