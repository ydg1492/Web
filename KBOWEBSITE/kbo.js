const API_URL = "kbo_parser.php";

/*시작*/
document.addEventListener("DOMContentLoaded", init);

async function init() {
    try {
        const data = await fetchData();
        const grouped = groupByDate(data);
        render(grouped);
    } catch (err) {
        console.error("로드 실패:", err);
    }
}

/*데이터 가져오기*/
async function fetchData() {
    const res = await fetch(API_URL);
    const json = await res.json();

    if (!json || !json.data) {
        throw new Error("데이터 없음");
    }

    return json.data;
}

/*요일별색깔*/
function getWeekColor(dateText) {

    if (!dateText) return "#999";

    //"06.02(화)" -> "화"
    const day = dateText.match(/\((.*?)\)/)?.[1];

    switch(day) {
        case "월": return "#9ca3af";
        case "화": return "#9ca3af";
        case "수": return "#9ca3af";
        case "목": return "#9ca3af";
        case "금": return "#a855f7";
        case "토": return "#06b6d4";
        case "일": return "#ef4444";
        default: return "#999";
    }
}

/*날짜별 그룹핑*/
function groupByDate(data) {

    const grouped = {};

    data.forEach(item => {

        const date = item.date || "날짜없음";

        if (!grouped[date]) {
            grouped[date] = [];
        }

        grouped[date].push(item);
    });

    return grouped;
}

/*전체 렌더링*/
function render(grouped) {

    const app = document.getElementById("kbo");
    app.innerHTML = "";

    Object.keys(grouped).forEach(date => {

        const games = grouped[date];

        const card = createDayCard(date, games);

        const color = getWeekColor(date);
        card.style.borderTop = `5px solid ${color}`;

        app.appendChild(card);
    });
}

/*하루 카드 생성*/
function createDayCard(date, games) {

    const card = document.createElement("div");
    card.className = "day-card";

    const grid = document.createElement("div");
    grid.className = "grid";

    //최대 5개만
    const limitedGames = games.slice(0, 5);

    limitedGames.forEach(game => {
        grid.appendChild(createGameCard(game));
    });

    const title = document.createElement("div");
    title.className = "date-title";
    title.innerText = date;

    title.style.color = getWeekColor(date);

    card.appendChild(title);
    card.appendChild(grid);

    return card;
}

/*구장별색깔*/
function getStadiumClass(stadium){

    switch(stadium){

        case "잠실": return "jamsil";
        case "대구": return "daegu";
        case "광주": return "gwangju";
        case "대전": return "daejeon";
        case "사직": return "sajik";
        case "수원": return "suwon";
        case "창원": return "changwon";
        case "인천": return "incheon";
        case "고척": return "gocheok";

        default: return "";
    }
}

/*경기 카드 생성*/
function createGameCard(game) {

    const div = document.createElement("div");
    div.className = "game";

    const stadium = game.stadium || "미정";
    const home = game.home || "-";
    const away = game.away || "-";
    const score = game.score || "-";

    const stadiumClass = getStadiumClass(stadium);

    div.innerHTML = `
        <div class="stadium ${stadiumClass}">
            ${stadium}
        </div>

        <div class="teams">
            <span class="home-team">${away}</span>
            <span class="vs">VS</span>
            <span class="away-team">${home}</span>
        </div>

        <div class="score">${score}</div>
    `;

    return div;
}