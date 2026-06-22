//전역변수
let map;
let ps;
let markers = [];

let selectedIndex = 0;
let overlay;

let searchResults = [];
let lastPos = null;

//API최적화
const routeCache = new Map();     // 캐시 (API 절약 핵심)
let lastRouteKey = null;          // 중복 요청 방지
let routeTimer = null;            // debounce

// 10개구장좌표 데이터
const stadiums = [
    { team:"LG 트윈스", stadium:"잠실야구장", lat:37.5121, lng:127.0719 },
    { team:"두산 베어스", stadium:"잠실야구장", lat:37.5121, lng:127.0719 },
    { team:"SSG 랜더스", stadium:"SSG랜더스필드", lat:37.4369, lng:126.6934 },
    { team:"키움 히어로즈", stadium:"고척스카이돔", lat:37.4982, lng:126.8671 },
    { team:"KIA 타이거즈", stadium:"광주기아챔피언스필드", lat:35.1681, lng:126.8890 },
    { team:"삼성 라이온즈", stadium:"삼성라이온즈파크", lat:35.8419, lng:128.6811 },
    { team:"롯데 자이언츠", stadium:"사직야구장", lat:35.1940, lng:129.0615 },
    { team:"NC 다이노스", stadium:"창원NC파크", lat:35.2226, lng:128.5827 },
    { team:"KT 위즈", stadium:"수원KT위즈파크", lat:37.2997, lng:127.0097 },
    { team:"한화 이글스", stadium:"한화생명볼파크", lat:36.3171, lng:127.4293 }
];

//초기화
window.onload = () => {

    initMap();

    const selected = document.getElementById("selected");
    const options = document.getElementById("options");

    if (selected && options) {
        createSelect();

        selected.addEventListener("click", toggleOptions);

        document.addEventListener("click", (e) => {
            const box = document.querySelector(".stadium-select");
            if (box && !box.contains(e.target)) {
                options.classList.remove("show");
            }
        });
    }
};

//지도 초기화
function initMap() {

    map = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(stadiums[0].lat, stadiums[0].lng),
        level: 4
    });

    ps = new kakao.maps.services.Places();

    drawStadium();
}

//구장 마커
function drawStadium() {

    const s = stadiums[selectedIndex];

    const pos = new kakao.maps.LatLng(s.lat, s.lng);

    const marker = new kakao.maps.Marker({
        map,
        position: pos,
        title: s.stadium
    });

    markers.push(marker);
    map.setCenter(pos);
}

//마커 정리(메모리 최적화)
function clearMarkers() {

    markers.forEach(m => m.setMap(null));
    markers = [];
}

//구장 변경
function changeStadium() {

    clearMarkers();
    drawStadium();

    document.getElementById("list").innerHTML = "";

    document.getElementById("routeInfo").innerHTML = `
        <div>거리 : -</div>
        <div>예상시간 : -</div>
    `;
}

//드롭다운
function createSelect() {

    const options = document.getElementById("options");

    let html = "";

    stadiums.forEach((s, i) => {
        html += `<div class="option" onclick="selectTeam(${i})">${s.team}</div>`;
    });

    options.innerHTML = html;
}

function toggleOptions() {
    document.getElementById("options").classList.toggle("show");
}

function selectTeam(index) {

    selectedIndex = index;

    document.getElementById("selected").innerHTML = stadiums[index].team;
    document.getElementById("options").classList.remove("show");

    changeStadium();
}

//장소 검색
function searchPlace(type) {

    clearMarkers();
    drawStadium();

    ps.keywordSearch(
        `${stadiums[selectedIndex].stadium} ${type}`,
        placeCallback
    );
}

//검색 결과
function placeCallback(data, status) {

    if (status !== kakao.maps.services.Status.OK) {
        alert("검색 결과 없어요 다시 확인해주세요");
        return;
    }

    searchResults = data;

    let html = "";

    data.forEach((place, index) => {

        const pos = new kakao.maps.LatLng(place.y, place.x);

        const marker = new kakao.maps.Marker({
            map,
            position: pos
        });

        markers.push(marker);

        const stadiumPos = new kakao.maps.LatLng(
            stadiums[selectedIndex].lat,
            stadiums[selectedIndex].lng
        );

        const straight = getDistance(stadiumPos, pos);

        html += `
            <div class="card" onclick="moveMap(${index})">
                <h3>${place.place_name}</h3>
                <p>${place.address_name}</p>
                <p>${place.phone || "-"}</p>
                <p>직선거리 : ${straight} km</p>
            </div>
        `;
    });

    document.getElementById("list").innerHTML = html;
}

//지도이동
function moveMap(index) {

    const place = searchResults[index];

    const newPos = new kakao.maps.LatLng(place.y, place.x);

    const stadiumPos = new kakao.maps.LatLng(
        stadiums[selectedIndex].lat,
        stadiums[selectedIndex].lng
    );

    const straight = getDistance(stadiumPos, newPos);

    const fromPos = lastPos || stadiumPos;

    //기존 마커 제거
    clearMarkers();

    //마커 생성(출발점에서 시작)
    const marker = new kakao.maps.Marker({
        position: fromPos
    });

    marker.setMap(map);
    markers = [marker];

    //기존 overlay 제거
    if (overlay) overlay.setMap(null);

    //overlay DOM 생성
    const content = document.createElement("div");
    content.className = "place-label";
    content.innerText = place.place_name;

    //overlay 생성
    overlay = new kakao.maps.CustomOverlay({
        position: newPos,
        content: content
    });

    overlay.setMap(map);

    //CSS 애니메이션
    requestAnimationFrame(() => {
        content.classList.add("show");
    });

    //마커 이동 애니메이션
    animateMove(marker, fromPos, newPos);

    //카메라 이동
    moveCamera(newPos);

    //마지막 위치 저장
    lastPos = newPos;

    //경로 요청
    requestRoute(stadiumPos, newPos, straight);
}

//API 요청 최적화
function requestRoute(from, to, straight) {

    const key = `${from.getLat()},${from.getLng()}_${to.getLat()},${to.getLng()}`;

    //중복 방지
    if (key === lastRouteKey) return;
    lastRouteKey = key;

    //캐시 히트
    if (routeCache.has(key)) {
        renderRoute(routeCache.get(key));
        return;
    }

    //debounce
    clearTimeout(routeTimer);

    routeTimer = setTimeout(() => {
        fetchRoute(from, to, straight, key);
    }, 250);
}

//실제 API 호출
async function fetchRoute(from, to, straight, key) {

    try {
        const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${from.getLng()},${from.getLat()}&destination=${to.getLng()},${to.getLat()}&priority=TIME`;

        const res = await fetch(url, {
            headers: {
                "Authorization": "KakaoAK 4b8d696e486276640272e4aee9ece249"
            }
        });

        const data = await res.json();

        let time = Math.ceil(straight * 12);

        if (data.routes?.length > 0) {
            time = Math.ceil(data.routes[0].summary.duration / 60);
        }

        const result = {
            distance: straight,
            time,
            minTime: Math.floor(time * 0.85),
            maxTime: Math.ceil(time * 1.15)
        };

        routeCache.set(key, result);
        renderRoute(result);

    } catch (e) {

        const fallback = {
            distance: straight,
            time: Math.ceil(straight * 12),
            minTime: Math.floor(straight * 12 * 0.85),
            maxTime: Math.ceil(straight * 12 * 1.15)
        };

        renderRoute(fallback);
    }
}

//UI 렌더
function renderRoute(data) {

    document.getElementById("routeInfo").innerHTML = `
        <div>거리 : ${data.distance} km</div>
        <div>예상시간 : ${data.time} 분</div>
        <div>오차범위 : ${data.minTime} ~ ${data.maxTime} 분</div>
    `;
}

//거리 계산
function getDistance(p1, p2) {

    const R = 6371;

    const dLat = (p2.getLat() - p1.getLat()) * Math.PI / 180;
    const dLng = (p2.getLng() - p1.getLng()) * Math.PI / 180;

    const a =
        Math.sin(dLat/2)**2 +
        Math.cos(p1.getLat()*Math.PI/180) *
        Math.cos(p2.getLat()*Math.PI/180) *
        Math.sin(dLng/2)**2;

    return (R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(2);
}

//마커이동
function animateMove(marker, fromPos, toPos) {

    let progress = 0;
    const duration = 300; // ms
    const start = performance.now();

    function animate(now) {

        progress = (now - start) / duration;

        if (progress > 1) progress = 1;

        // easing (부드럽게)
        const ease = 1 - Math.pow(1 - progress, 3);

        const lat = fromPos.getLat() + (toPos.getLat() - fromPos.getLat()) * ease;
        const lng = fromPos.getLng() + (toPos.getLng() - fromPos.getLng()) * ease;

        marker.setPosition(new kakao.maps.LatLng(lat, lng));

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

//카메라 이동
function moveCamera(pos) {
    map.panTo(pos);
}