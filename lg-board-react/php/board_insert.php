<?php
session_start();

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

$db = new mysqli("localhost", "root", "1234", "kbo");
$db->set_charset("utf8mb4");

// 로그인 체크
if (!isset($_SESSION['member_no'])) {
    echo json_encode([
        "result" => "fail",
        "msg" => "로그인이 필요합니다"
    ]);
    exit;
}

$member_no = (int)$_SESSION['member_no'];
$title = trim($_POST['title'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($title === '' || $message === '') {
    echo json_encode([
        "result" => "fail",
        "msg" => "제목/내용 필요"
    ]);
    exit;
}

//FK 체크
$check = $db->prepare("SELECT member_no FROM lg_member WHERE member_no = ?");
$check->bind_param("i", $member_no);
$check->execute();
$res = $check->get_result();

if ($res->num_rows === 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "존재하지 않는 회원번호 (FK 실패)",
        "member_no" => $member_no
    ]);
    exit;
}

// INSERT
$stmt = $db->prepare("
    INSERT INTO lg_board (member_no, title, message, regdate)
    VALUES (?, ?, ?, NOW())
");

if (!$stmt) {
    echo json_encode([
        "result" => "fail",
        "msg" => "SQL 오류",
        "error" => $db->error
    ]);
    exit;
}

$stmt->bind_param("iss", $member_no, $title, $message);

if (!$stmt->execute()) {
    echo json_encode([
        "result" => "fail",
        "msg" => "INSERT 실패",
        "error" => $stmt->error
    ]);
    exit;
}

echo json_encode([
    "result" => "success"
]);