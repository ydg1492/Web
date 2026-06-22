<?php
session_start();

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "1234", "kbo");

if ($conn->connect_error) {
    echo json_encode([
        "result" => "error",
        "msg" => "DB 연결 실패"
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "result" => "error",
        "msg" => "잘못된 접근"
    ]);
    exit;
}

if (!isset($_SESSION['member_no'])) {
    echo json_encode([
        "result" => "error",
        "msg" => "로그인이 필요합니다"
    ]);
    exit;
}

$no = isset($_POST['no']) ? (int)$_POST['no'] : 0;
$member_no = (int)$_SESSION['member_no'];

if ($no <= 0) {
    echo json_encode([
        "result" => "error",
        "msg" => "잘못된 글 번호"
    ]);
    exit;
}

$stmt = $conn->prepare("
    DELETE FROM lg_board 
    WHERE no = ? AND member_no = ?
");

$stmt->bind_param("ii", $no, $member_no);

if (!$stmt->execute()) {
    echo json_encode([
        "result" => "error",
        "msg" => "SQL 실행 실패"
    ]);
    exit;
}

if ($stmt->affected_rows > 0) {
    echo json_encode([
        "result" => "success",
        "msg" => "삭제 성공"
    ]);
} else {
    echo json_encode([
        "result" => "fail",
        "msg" => "권한 없음 또는 게시글 없음"
    ]);
}

$stmt->close();
$conn->close();
?>