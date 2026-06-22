<?php

session_start();

session_destroy();

header(
    "Location: ../html/ssgboard.html"
);

exit;
?>
