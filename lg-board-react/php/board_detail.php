<?php

session_start();

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 0);

/* =====================
   DB 연결
===================== */

$conn = new mysqli(
    "localhost",
    "root",
    "1234",
    "kbo"
);

if ($conn->connect_error) {

    echo json_encode([
        "status" => "error",
        "message" => "DB 연결 실패"
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$conn->set_charset("utf8mb4");

/* =====================
   응답 함수
===================== */

function response(
    $status,
    $message,
    $data = null
) {

    echo json_encode([
        "status" => $status,
        "message" => $message,
        "data" => $data
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

/* =====================
   게시글 번호
===================== */

$no = (int)($_POST['no'] ?? 0);

if ($no <= 0) {

    response(
        "fail",
        "잘못된 게시글 번호"
    );
}

/* =====================
   게시글 조회
===================== */

$sql = "
SELECT
    b.no,
    b.member_no,
    b.title,
    b.message,
    b.regdate,
    m.user_id
FROM lg_board b
LEFT JOIN lg_member m
    ON b.member_no = m.member_no
WHERE b.no = ?
";

$stmt = $conn->prepare($sql);

if (!$stmt) {

    response(
        "error",
        "SQL 준비 실패"
    );
}

$stmt->bind_param(
    "i",
    $no
);

if (!$stmt->execute()) {

    response(
        "error",
        "SQL 실행 실패"
    );
}

$result = $stmt->get_result();

$row = $result->fetch_assoc();

$stmt->close();

if (!$row) {

    response(
        "fail",
        "게시글 없음"
    );
}

/* =====================
   로그인 권한
===================== */

$login_member =
    $_SESSION['member_no']
    ?? 0;

$is_owner = (
    $login_member > 0
    &&
    $login_member == $row['member_no']
);

/* =====================
   응답
===================== */

response(
    "success",
    "조회 성공",
    [
        "no" => (int)$row['no'],
        "title" => $row['title'],
        "message" => $row['message'],
        "member_no" => (int)$row['member_no'],
        "user_id" => $row['user_id'],
        "regdate" => $row['regdate'],
        "is_owner" => $is_owner
    ]
);

$conn->close();

?>