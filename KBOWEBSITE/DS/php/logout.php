<?php

session_start();

session_destroy();

header(
    "Location: ../html/dsboard.html"
);

exit;
?>
