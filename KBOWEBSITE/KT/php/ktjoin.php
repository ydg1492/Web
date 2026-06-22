<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL & ~E_WARNING);

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

$id  = $_POST['id'] ?? '';
$pw1 = $_POST['pw1'] ?? '';
$pw2 = $_POST['pw2'] ?? '';

if ($id == '' || $pw1 == '' || $pw2 == '') {
    echo json_encode([
        "result"=>"fail",
        "msg"=>"필수값 없음"
    ]);
    exit;
}

if ($pw1 !== $pw2) {
    echo json_encode([
        "result"=>"fail",
        "msg"=>"비밀번호 불일치"
    ]);
    exit;
}

if (strlen($pw1) < 8) {
    echo json_encode([
        "result"=>"fail",
        "msg"=>"비밀번호는 8자 이상 입력하세요."
    ]);
    exit;
}

$stmt = $db->prepare("
    INSERT INTO kt_member (user_id, user_pwd1, user_pwd2, date)
    VALUES (?, ?, ?, NOW())
");

if (!$stmt) {
    echo json_encode([
        "result"=>"fail",
        "msg"=>$db->error
    ]);
    exit;
}

$stmt->bind_param("sss", $id, $pw1, $pw2);

$result = $stmt->execute();

if (!$result) {
    echo json_encode([
        "result"=>"fail",
        "msg"=>$stmt->error
    ]);
    exit;
}

$stmt->close();
$db->close();

echo json_encode([
    "result"=>"success"
]);
?>