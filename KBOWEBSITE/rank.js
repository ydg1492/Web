async function loadKBO() {

    const res = await fetch("./rank.php");
    const json = await res.json();   // json으로 받기

    const container = document.getElementById("container");
    container.innerHTML = "";

    // 마지막 업데이트
    document.getElementById("updateTime").textContent = json.time;

    const data = json.data;

    // 에러 체크
    if (!Array.isArray(data)) {
        container.innerHTML = `<p>${json.error || '데이터 오류'}</p>`;
        return;
    }

    data.forEach(team => {

        const rank = Number(team.rank);

        let rankClass = "";

        if (rank === 1) {
            rankClass = "gold";
        } else if (rank === 2) {
            rankClass = "silver";
        } else if (rank === 3) {
            rankClass = "bronze";
        } else if (rank <= 5) {
            rankClass = "blue";
        } else if (rank <= 7) {
            rankClass = "green";
        } else {
            rankClass = "red";
        }

        const div = document.createElement("div");
        div.className = `rank-card ${rankClass}`;

        div.innerHTML = `
            <div class="rank ${rankClass}">
                ${team.rank}위
            </div>

            <h3>${team.team}</h3>

            <p>경기 : ${team.game}</p>

            <p>${team.win}승 ${team.lose}패 ${team.draw}무</p>

            <p>승률 : ${team.rate}</p>
        `;

        container.appendChild(div);
    });
}

// 최초 실행
loadKBO();

// 30초마다 갱신
setInterval(loadKBO, 30000);