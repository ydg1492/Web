let chart;

const ChartDataLabels = window.ChartDataLabels;
Chart.register(ChartDataLabels);


/*카드용 색상*/
function getRankColor(rank){

    if(rank===1) return "#FFD700";
    if(rank===2) return "#C0C0C0";
    if(rank===3) return "#CD7F32";
    if(rank<=5) return "#22c55e";
    if(rank<=7) return "#3b82f6";

    return "#ef4444";
}


/*입체감 그라데이션*/
function createGradient(ctx, chart, rank){

    const area = chart.chartArea;

    const gradient = ctx.createLinearGradient(
        0,
        0,
        area ? area.right : ctx.canvas.width,
        0
    );

    if(rank === 1){
        gradient.addColorStop(0, "#FFF9B0"); 
        gradient.addColorStop(0.5, "#FFD700");
        gradient.addColorStop(1, "#C58A00");

    } else if(rank === 2){
        gradient.addColorStop(0, "#FFFFFF");
        gradient.addColorStop(0.5, "#D1D5DB");
        gradient.addColorStop(1, "#6B7280");

    } else if(rank === 3){
        gradient.addColorStop(0, "#FDE68A");
        gradient.addColorStop(0.5, "#CD7F32");
        gradient.addColorStop(1, "#7C3A1D");

    } else if(rank <= 5){
        gradient.addColorStop(0, "#6EE7B7");
        gradient.addColorStop(0.5, "#22c55e");
        gradient.addColorStop(1, "#166534");

    } else if(rank <= 7){
        gradient.addColorStop(0, "#93C5FD");
        gradient.addColorStop(0.5, "#3b82f6");
        gradient.addColorStop(1, "#1E3A8A");

    } else {
        gradient.addColorStop(0, "#FDA4AF");
        gradient.addColorStop(0.5, "#ef4444");
        gradient.addColorStop(1, "#7F1D1D");
    }

    return gradient;
}


/*데이터 로딩*/
async function load_chart_KBO(){

    try{

        const res = await fetch("./rank.php");
        const json = await res.json();

        const container = document.getElementById("container");
        const updateTime = document.getElementById("updateTime");

        if(updateTime) updateTime.textContent = json.time;

        container.innerHTML = "";

        const data = json.data;

        if(!Array.isArray(data)){
            container.innerHTML = "데이터 오류";
            return;
        }

        data.forEach(team => {

            const rank = Number(team.rank);

            let rate = Number(team.rate);
            if(rate > 1) rate = rate / 100;

            /*php기준 승무패 */
            const win = Number(team.win ?? 0);
            const draw = Number(team.draw ?? 0);
            const lose = Number(team.lose ?? 0);

            const color = getRankColor(rank);

            const div = document.createElement("div");
            div.className = `rank-card rank-${rank}`;

            div.innerHTML = `
                <h3 style="color:${color}">
                    ${rank}위 ${team.team}
                </h3>

                <p>경기 : ${team.game}</p>
                
                <p style="font-size:13px; opacity:0.85;">
                    ${win}승 ${draw}무 ${lose}패
                </p>

                <p>승률 : ${rate.toFixed(3)}</p>

                <div class="win-bar">
                    <span style="width:${rate*100}%; background:${color}"></span>
                </div>
            `;

            container.appendChild(div);
        });

        drawChart(data);

    } catch(err){
        console.error("데이터 로딩 실패:", err);
    }
}


/*Chart 생성*/
function drawChart(data){

    const canvas = document.getElementById("kboChart");
    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const labels = data.map(
        t => `${t.rank}위 ${t.team}`
    );

    const rates = data.map(t => {
        let r = Number(t.rate);
        return r > 1 ? r / 100 : r;
    });

    if(chart) chart.destroy();

    chart = new Chart(canvas, {

        type: "bar",

        data: {
            labels,
            datasets: [{
                data: rates,

                backgroundColor: (context) => {
                    const index = context.dataIndex;
                    const rank = Number(data[index].rank);

                    return createGradient(
                        context.chart.ctx,
                        context.chart,
                        rank
                    );
                },

                borderRadius: 22,
                borderSkipped: false,
                barThickness: 18,
            }]
        },

        options: {

            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                legend: { display: false },

                title: {
                    display: true,
                    text: "KBO 팀별 승률",
                    color: "#fff",
                    font: {
                        size: 20,
                        weight: "bold"
                    }
                },

                datalabels: {
                    anchor: "end",
                    align: "end",
                    color: "#fff",
                    font: {
                        weight: "bold"
                    },
                    formatter: (value) => value.toFixed(3)
                }
            },

            scales: {

                x: {
                    min: 0.30,
                    max: 0.70,

                    grid: {
                        color: "rgba(255,255,255,0.05)"
                    },

                    ticks: {
                        color: "#fff",
                        callback: value => Number(value).toFixed(3)
                    }
                },

                y: {
                    grid: { display: false },
                    ticks: {
                        color: "#fff",
                        font: { weight: "bold" }
                    }
                }
            }
        },

        plugins: [ChartDataLabels]
    });
}


/* 실행 */
load_chart_KBO();
setInterval(load_chart_KBO, 30000);