<?php
session_start();

require_once "db.php";

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$limit = 10;

$page = isset($_GET['page'])
    ? (int)$_GET['page']
    : 1;

$offset = ($page - 1) * $limit;

/* 검색 */

$type = $_GET['type'] ?? '';
$keyword = trim($_GET['keyword'] ?? '');

$where = '';

if($keyword != ''){

    $keyword = $conn->real_escape_string($keyword);

    switch($type){

        case 'title':

            $where =
            " WHERE b.title LIKE '%{$keyword}%'";
            break;

        case 'message':

            $where =
            " WHERE b.message LIKE '%{$keyword}%'";
            break;

        case 'name':

            $where =
            " WHERE m.user_id LIKE '%{$keyword}%'";
            break;

        default:

            $where =
            " WHERE b.title LIKE '%{$keyword}%'
               OR b.message LIKE '%{$keyword}%'
               OR m.user_id LIKE '%{$keyword}%'";
    }
}

/* 전체 게시물 수 */

$totalSql = "
SELECT COUNT(*) AS cnt
FROM lg_board b
INNER JOIN lg_member m
ON b.member_no = m.member_no
{$where}
";

$totalResult = $conn->query($totalSql);

$totalRow = $totalResult->fetch_assoc();

$totalCount = $totalRow['cnt'];

$totalPages = ceil($totalCount / $limit);

/* 목록 조회 */

$sql = "
SELECT
    b.no,
    m.user_id,
    b.title,
    b.message,
    b.regdate
FROM lg_board b
INNER JOIN lg_member m
ON b.member_no = m.member_no
{$where}
ORDER BY b.no DESC
LIMIT $limit
OFFSET $offset
";

$result = $conn->query($sql);

$list = [];

while($row = $result->fetch_assoc()){

    $list[] = $row;
}

/* JSON 반환 */

echo json_encode([
    "list" => $list,
    "totalPages" => $totalPages,
    "currentPage" => $page,
    "keyword" => $keyword,
    "type" => $type
]);