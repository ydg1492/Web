<?php
session_start();
include "../../db.php";

header("Content-Type: application/json; charset=utf-8");

$no = intval($_POST['no'] ?? 0);

if ($no <= 0) {
    echo json_encode([
        "result" => "fail",
        "msg" => "no 없음"
    ]);
    exit;
}

$stmt = $conn->prepare("
   SELECT b.*, m.user_id
   FROM lg_board b
   LEFT JOIN lg_member m
   ON b.member_no = m.member_no
   WHERE b.no = ?
");

$stmt->bind_param("i", $no);
$stmt->execute();

$row = $stmt->get_result()->fetch_assoc();

if (!$row) {
    echo json_encode([
        "result" => "fail",
        "msg" => "게시글 없음"
    ]);
    exit;
}

$member_no = $_SESSION['member_no'] ?? 0;

echo json_encode([
    "result" => "success",
    "data" => $row,
    "is_owner" => ($member_no && $member_no == $row['member_no'])
]);