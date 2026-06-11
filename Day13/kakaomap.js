// //지도를 보여줄 div 요소 찾기
// var container= document.getElementById('map');

// //지도의 위치나 줌레벨 정도를 옵션으로 미리 지정
// var options= {
//     center: new kakao.maps.LatLng(37.51201 , 127.07174),
//     level: 3, //1~25
// }

// //지도객체를 만들고 보여주기
// var map= new kakao.maps.Map(container, options);
// // ---------------------------------------------------

// var positions = [
//     {
//         content: '<div>1루응원석</div>', 
//         latlng: new kakao.maps.LatLng(37.5123, 127.0719)
//     },
//     {
//         content: '<div>3루응원석</div>', 
//         latlng: new kakao.maps.LatLng(37.5119, 127.0712)
//     },
//     {
//         content: '<div>1루매점</div>', 
//         latlng: new kakao.maps.LatLng(37.5125, 127.0723)
//     },
//     {
//         content: '<div>3루매점</div>',
//         latlng: new kakao.maps.LatLng(37.5118, 127.0710)
//     }
// ];

// for (var i = 0; i < positions.length; i ++) {
//     // 마커를 생성합니다
//     var marker = new kakao.maps.Marker({
//         map: map, // 마커를 표시할 지도
//         position: positions[i].latlng // 마커의 위치
//     });

//     // 마커에 표시할 인포윈도우를 생성합니다 
//     var infowindow = new kakao.maps.InfoWindow({
//         content: positions[i].content // 인포윈도우에 표시할 내용
//     });

//     // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
//     // 이벤트 리스너로는 클로저를 만들어 등록합니다 
//     // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
//     kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
//     kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
// }

// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
// function makeOverListener(map, marker, infowindow) {
//     return function() {
//         infowindow.open(map, marker);
//     };
// }

// // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
// function makeOutListener(infowindow) {
//     return function() {
//         infowindow.close();
//     };
// }


// var imageSrc = './image/LG.Png', // 마커이미지의 주소입니다    
// imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
// imageOption = {offset: new kakao.maps.Point(25, 60)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// var markerImage = new kakao.maps.MarkerImage(
//     imageSrc,
//     imageSize,
//     imageOption
// );


// // 내 위치에 마커 표시하기
// // 마커가 표시될 위치입니다 
// var markerPosition  = new kakao.maps.LatLng(37.51201, 127.07174); 

// // 마커를 생성합니다
// var marker = new kakao.maps.Marker({
//     position: markerPosition,
//     image: markerImage
// });

// // 마커가 지도 위에 표시되도록 설정합니다
// marker.setMap(map);

// var infowindow = new kakao.maps.InfoWindow({
//     content: '<div style="padding:5px;">중심 위치</div>'
// });

// function updateCenterContent() {
//     var center = map.getCenter();

//     var marker = new kakao.maps.Marker({
//         position: center,
//         map: map
//     });

//     infowindow.open(map, marker);
// }

// // 지도 이동 끝날 때마다 실행
// kakao.maps.event.addListener(map, 'center_changed', function () {
//     updateCenterContent();
// });

// 지도 생성
var container = document.getElementById('map');

var options = {
    center: new kakao.maps.LatLng(37.51201, 127.07174),
    level: 3
};

var map = new kakao.maps.Map(container, options);


// ---------------------------------------------------
// 모든마커통합
var positions = [
    //여러개의 마커
    {
        content: '<div class="infowindow">1루응원석</div>',
        latlng: new kakao.maps.LatLng(37.5123, 127.0719),
        imageSrc: './image/LG.png',
        imageSize: { width: 40, height: 40 },
        imageOffset: { x: 20, y: 40 }
    },
    {
        content: '<div class="infowindow">3루응원석</div>',
        latlng: new kakao.maps.LatLng(37.5119, 127.0712),
        imageSrc: './image/DS.png',
        imageSize: { width: 40, height: 40 },
        imageOffset: { x: 20, y: 40 }
    },
    {
        content: '<div class="infowindow">1루매점</div>',
        latlng: new kakao.maps.LatLng(37.5125, 127.0723),
        imageSrc: './image/LG.png',
        imageSize: { width: 40, height: 40 },
        imageOffset: { x: 20, y: 40 }
    },
    {
        content: '<div class="infowindow">3루매점</div>',
        latlng: new kakao.maps.LatLng(37.5118, 127.0710),
        imageSrc: './image/DS.png',
        imageSize: { width: 40, height: 40 },
        imageOffset: { x: 20, y: 40 }
    },

    // CENTER
    {
        content: '<div class="infowindow">지도 중심 위치</div>',
        latlng: map.getCenter(),
        isCenter: true,
        imageSrc: './image/SB.png',
        imageSize: { width: 40, height: 40 },
        imageOffset: { x: 20, y: 40 }
    }
];


// ---------------------------------------------------
// CENTER용 변수

var centerMarker = null;


// ---------------------------------------------------
// 마커 + InfoWindow 처리

for (var i = 0; i < positions.length; i++) {
        
    //마커이미지생
    var image = new kakao.maps.MarkerImage(
        positions[i].imageSrc,
        new kakao.maps.Size(
            positions[i].imageSize.width,
            positions[i].imageSize.height
        ),
        {
            offset: new kakao.maps.Point(
                positions[i].imageOffset.x,
                positions[i].imageOffset.y
            )
        }
    );
    
    //마커생성
    var marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        image: image
    });

    var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content
    });

    // CENTER 저장
    if (positions[i].isCenter) {
        centerMarker = marker;
    }

    // hover 이벤트 (모든 마커 동일)
    kakao.maps.event.addListener(marker, 'mouseover',
        makeOverListener(map, marker, infowindow));

    kakao.maps.event.addListener(marker, 'mouseout',
        makeOutListener(infowindow));
}


// ---------------------------------------------------
// hover 함수
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
    };
}


// ---------------------------------------------------
//CENTER 이동만 유지

function updateCenterMarker() {
    var center = map.getCenter();

    if (centerMarker) {
        centerMarker.setPosition(center);
    }
}


// 지도 이동 끝날 때마다 업데이트
kakao.maps.event.addListener(map, 'idle', function () {
    updateCenterMarker();
});