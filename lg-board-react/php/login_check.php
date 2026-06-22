<?php

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

echo json_encode([
    "login"     => isset($_SESSION['member_no']),
    "member_no" => $_SESSION['member_no'] ?? null,
    "user_id"   => $_SESSION['user_id'] ?? null
]);