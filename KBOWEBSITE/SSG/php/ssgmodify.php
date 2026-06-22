<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL & ~E_WARNING);

session_start();

// DB 연결
$db = new mysqli(
    "localhost",
    "root",
    "1234",
    "kbo"
);

if ($db->connect_error) {
    echo json_encode([
        "result" => "fail",
        "msg" => "DB 연결 실패"
    ]);
    exit;
}

$db->set_charset("utf8mb4");


// 로그인 체크
$member_no = $_SESSION['member_no'] ?? 0;

if ($member_no <= 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "로그인이 필요합니다"
    ]);
    exit;
}


// 게시글 번호
$no = (int)($_POST['no'] ?? 0);

if ($no <= 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "게시글 번호 없음"
    ]);
    exit;
}



// 수정할 값 동적 처리
$fields = [];
$params = [];
$types = "";


if (!empty($_POST['title'])) {
    $fields[] = "title = ?";
    $params[] = trim($_POST['title']);
    $types .= "s";
}


if (!empty($_POST['msg'])) {
    $fields[] = "message = ?";
    $params[] = trim($_POST['msg']);
    $types .= "s";
}


if (count($fields) === 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "수정할 내용이 없습니다"
    ]);
    exit;
}


//본인 글만 수정 가능
$sql = "
UPDATE ssg_board
SET " . implode(", ", $fields) . ",
    regdate = NOW()
WHERE no = ?
AND member_no = ?
";

$params[] = $no;
$types .= "i";

$params[] = $member_no;
$types .= "i";


$stmt = $db->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "result" => "fail",
        "msg" => "SQL 준비 실패"
    ]);
    exit;
}



$stmt->bind_param($types, ...$params);

if (!$stmt->execute()) {
    echo json_encode([
        "result" => "fail",
        "msg" => $stmt->error
    ]);
    exit;
}

if ($stmt->affected_rows <= 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "수정 권한이 없거나 글이 존재하지 않습니다"
    ]);
    exit;
}


$stmt->close();
$db->close();

echo json_encode([
    "result" => "success",
    "no" => $no
]);
?>