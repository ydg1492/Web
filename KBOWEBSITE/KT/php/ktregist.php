<?php
session_start();

header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL & ~E_WARNING);

if (!isset($_SESSION['member_no'])) {
    echo json_encode([
        "result" => "fail",
        "msg" => "로그인이 필요합니다."
    ]);
    exit;
}

$db = new mysqli(
    "localhost",
    "root",
    "1234",
    "kbo"
);

$db->set_charset("utf8");

if ($db->connect_error) {
    echo json_encode([
        "result"=>"fail",
        "msg"=>"DB 연결 실패"
    ]);
    exit;
}

$member_no = $_SESSION['member_no'];
$title     = trim($_POST['title'] ?? '');
$message   = trim($_POST['message'] ?? '');

if ($title == '' || $message == '') {
    echo json_encode([
        "result"=>"fail",
        "msg"=>"제목과 내용을 입력하세요."
    ]);
    exit;
}

$stmt = $db->prepare("
    INSERT INTO kt_board (member_no, title, message, regdate)
    VALUES (?, ?, ?, NOW())
");

$stmt->bind_param("iss", $member_no, $title, $message);

if (!$stmt->execute()) {
    echo json_encode([
        "result"=>"fail",
        "msg"=>$stmt->error
    ]);
    exit;
}

echo json_encode([
    "result"=>"success"
]);

$stmt->close();
$db->close();