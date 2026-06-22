<?php

session_start();

session_destroy();

header(
    "Location: ../html/kiaboard.html"
);

exit;
?>
