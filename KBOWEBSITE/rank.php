<?php
header("Content-Type: application/json; charset=utf-8");
date_default_timezone_set('Asia/Seoul');

$time = date('Y-m-d H:i:s');

$url = "https://www.koreabaseball.com/Record/TeamRank/TeamRankDaily.aspx";

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_USERAGENT => "Mozilla/5.0"
]);

$html = curl_exec($ch);
curl_close($ch);

libxml_use_internal_errors(true);

$dom = new DOMDocument();
$dom->loadHTML('<?xml encoding="utf-8" ?>'.$html);

$xpath = new DOMXPath($dom);

$table = $xpath->query("//table")->item(0);

if (!$table) {
    echo json_encode([
        "error" => "테이블 없음"
    ]);
    exit;
}

$rows = $xpath->query(".//tr", $table);

$result = [];

foreach ($rows as $i => $row) {

    if ($i == 0) continue;

    $td = $xpath->query(".//td", $row);

    if ($td->length < 7) continue;

    $result[] = [
        "rank"=>trim($td->item(0)->textContent),//rank
        "team"=>trim($td->item(1)->textContent),//team 
        "game"=>trim($td->item(2)->textContent),//game 
        "win"=>trim($td->item(3)->textContent), //win
        "lose"=>trim($td->item(4)->textContent),//lose
        "draw"=>trim($td->item(5)->textContent),//draw
        "rate"=>trim($td->item(6)->textContent)//rate
    ];
}

// 서버 시간 추가
echo json_encode([
    "time" => date("Y-m-d H:i:s"),
    "data" => $result
], JSON_UNESCAPED_UNICODE);
?>