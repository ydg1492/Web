<?php

header("Content-Type: application/json; charset=utf-8");

$url = "https://www.koreabaseball.com/ws/Schedule.asmx/GetScheduleList";

$postData = http_build_query([
    "leId" => 1,
    "srIdList" => "0,9,6",
    "seasonId" => 2026,
    "gameMonth" => "06",
    "teamId" => ""
]);

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postData,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "Referer: https://www.koreabaseball.com/Schedule/Schedule.aspx",
        "User-Agent: Mozilla/5.0"
    ],
    CURLOPT_TIMEOUT => 10,
]);

$response = curl_exec($ch);
curl_close($ch);

/*무조건 원본 저장 (디버그 핵심)*/
file_put_contents(__DIR__."/debug_kbo.txt", $response);

/*HTML 차단 체크*/
if (strpos($response, "<html") !== false) {
    echo json_encode([
        "status"=>"error",
        "message"=>"KBO 차단 (HTML)"
    ]);
    exit;
}

/*JSON인지 체크*/
$data = json_decode($response, true);

if (json_last_error() === JSON_ERROR_NONE) {

    echo json_encode([
        "status"=>"ok",
        "type"=>"json",
        "data"=>$data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/*4. XML도 아니고 JSON도 아니면 실패*/
echo json_encode([
    "status"=>"error",
    "message"=>"알 수 없는 응답 (XML/JSON 아님)",
    "preview"=>substr($response,0,300)
]);