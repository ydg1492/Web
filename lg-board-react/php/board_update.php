<?php
session_start();

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL & ~E_WARNING);

// =====================
// DB 연결
// =====================
$db = new mysqli("localhost", "root", "1234", "kbo");

if ($db->connect_error) {
    echo json_encode([
        "result" => "fail",
        "msg" => "DB 연결 실패"
    ]);
    exit;
}

$db->set_charset("utf8mb4");

// =====================
// 로그인 체크
// =====================
$member_no = $_SESSION['member_no'] ?? 0;

if ($member_no <= 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "로그인이 필요합니다"
    ]);
    exit;
}

// =====================
// 게시글 번호 체크
// =====================
$no = (int)($_POST['no'] ?? 0);

if ($no <= 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "게시글 번호 없음"
    ]);
    exit;
}

// =====================
// 입력값
// =====================
$title = trim($_POST['title'] ?? '');
$message   = trim($_POST['message'] ?? '');

// =====================
// 수정 내용 체크
// =====================
if ($title === '' && $message === '') {
    echo json_encode([
        "result" => "fail",
        "msg" => "수정할 내용이 없습니다"
    ]);
    exit;
}

// =====================
// 동적 업데이트
// =====================
$fields = [];
$params = [];
$types = "";

// title
if ($title !== '') {
    $fields[] = "title = ?";
    $params[] = $title;
    $types .= "s";
}

// message
if ($message !== '') {
    $fields[] = "message = ?";
    $params[] = $message;
    $types .= "s";
}

// =====================
// SQL 생성
// =====================
$sql = "
UPDATE lg_board
SET " . implode(", ", $fields) . ",
    regdate = NOW()
WHERE no = ?
AND member_no = ?
";

$params[] = $no;
$types .= "i";

$params[] = $member_no;
$types .= "i";

// =====================
// prepare
// =====================
$stmt = $db->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "result" => "fail",
        "msg" => "SQL 준비 실패"
    ]);
    exit;
}

// =====================
// 실행
// =====================
$stmt->bind_param($types, ...$params);

$success = $stmt->execute();

// =====================
// 성공여부 체크
// =====================
if (!$success) {
    echo json_encode([
        "result" => "fail",
        "msg" => $stmt->error
    ]);
    exit;
}

// =====================
// 수정 반영 체크 (중요 추가)
// =====================
if ($stmt->affected_rows <= 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "수정 권한이 없거나 변경된 내용이 없습니다"
    ]);
    exit;
}

// =====================
// 성공 응답 (무조건 통일)
// =====================
echo json_encode([
    "result" => "success",
    "msg" => "수정 완료",
    "no" => $no
]);

$stmt->close();
$db->close();
?>