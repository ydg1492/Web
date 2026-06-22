<?php

session_start();

session_destroy();

header(
    "Location: ../html/slboard.html"
);

exit;
?>
