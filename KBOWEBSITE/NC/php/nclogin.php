<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

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

$id = $_POST['id'] ?? '';
$pw = $_POST['pw'] ?? '';

if ($id == '' || $pw == '') {
    echo json_encode([
        "result"=>"fail",
        "msg"=>"아이디와 비밀번호를 입력하세요."
    ]);
    exit;
}

$stmt = $db->prepare("
    SELECT member_no,user_id, user_pwd1
    FROM nc_member
    WHERE user_id = ?
");

$stmt->bind_param("s", $id);
$stmt->execute();

$result = $stmt->get_result();

if($result->num_rows == 0){
    echo json_encode([
        "result"=>"fail",
        "msg"=>"존재하지 않는 아이디입니다."
    ]);
    exit;
}

$row = $result->fetch_assoc();

if($pw != $row['user_pwd1']){
    echo json_encode([
        "result"=>"fail",
        "msg"=>"비밀번호가 틀렸습니다."
    ]);
    exit;
}



$_SESSION['member_no'] = $row['member_no'];
$_SESSION['user_id'] = $row['user_id'];

echo json_encode([
    "result"=>"success",
    "id"=>$row['user_id']
]);

$stmt->close();
$db->close();
?>