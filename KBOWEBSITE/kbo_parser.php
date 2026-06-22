<?php

header("Content-Type: application/json; charset=utf-8");

/*PHP에서 받은 전체 JSON*/
$raw = file_get_contents("kbo.json"); 
$data = json_decode($raw, true);

if (!$data) {
    die(json_encode(["status"=>"error","message"=>"JSON 실패"]));
}

/*HTML 제거 함수*/
function clean($str) {
    return trim(strip_tags(html_entity_decode($str)));
}

$result = [];
$lastDate = null;

$rows = $data["data"]["rows"] ?? [];

foreach ($rows as $row) {

    $cols = $row["row"] ?? [];

    $date = $lastDate;
    $time = null;
    $home = null;
    $away = null;
    $score = null;
    $stadium = null;

    foreach ($cols as $col) {

        $text = clean($col["Text"] ?? "");
        $class = $col["Class"] ?? "";

        if ($class === "day") {
            $date = $text;
            $lastDate = $text;
        }

        if ($class === "time") {
            $time = $text;
        }

        if ($class === "play") {

            $match = str_replace(" ", "", $text);

            if (preg_match('/(.*?)(\d+)vs(\d+)(.*)/', $match, $m)) {
                $home = $m[1];
                $away = $m[4];
                $score = $m[2] . "-" . $m[3];
            }
        }

        if (in_array($text, ["잠실","고척","문학","수원","대전",
                            "대구","광주","사직","창원",
                            "포항","울산","청주","군산"])) {
            $stadium = $text;
        }
    }

    if ($home && $away) {
        $result[] = [
            "date" => $date,
            "time" => $time,
            "away" => $home,
            "home" => $away,
            "score" => $score,
            "stadium" => $stadium
        ];
    }
}

echo json_encode([
    "status" => "ok",
    "count" => count($result),
    "data" => $result
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);