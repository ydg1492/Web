<?php
$conn = new mysqli(
    "localhost",
    "root",
    "1234",
    "kbo"
);

if ($conn->connect_error) {
    die("DB 연결 실패: " . $conn->connect_error);
}

/* 한글 깨짐 방지 */
$conn->set_charset("utf8mb4");
?>


