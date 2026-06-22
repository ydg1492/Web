<?php

session_start();

header("Content-Type: application/json");

echo json_encode([
    "login"     => isset($_SESSION['member_no']),
    "member_no" => $_SESSION['member_no'] ?? null,
    "user_id"   => $_SESSION['user_id'] ?? null
]);