<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "1234", "kbo");

if ($conn->connect_error) {
    echo json_encode([
        "result" => "error",
        "msg" => "DB 연결 실패"
    ]);
    exit;
}

// POST 체크
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "result" => "error",
        "msg" => "잘못된 접근"
    ]);
    exit;
}

// 로그인 체크
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

// 본인 글만 삭제
$stmt = $conn->prepare("DELETE FROM lg_board WHERE no = ? AND member_no = ?");
$stmt->bind_param("ii", $no, $member_no);

$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode([
        "result" => "success",
        "msg" => "삭제 성공"
    ]);
} else {
    echo json_encode([
        "result" => "fail",
        "msg" => "삭제 실패 (권한 없음 또는 글 없음)"
    ]);
}

$stmt->close();
$conn->close();
?>