let writeBtn;

let currentType = '';
let currentKeyword = '';

window.onload = function () {
    initPage();
    checkLogin();

};

function checkLogin(){

    fetch("/KBOWEBSITE/KT/php/login_check.php")
    .then(res => res.json())
    .then(data => {

        const loginUser = document.getElementById("loginUser");
        const loginLink = document.getElementById("loginLink");

        if(data.login){

            loginUser.innerHTML = `${data.user_id}님`;

            loginLink.innerText = "로그아웃";
            loginLink.href = "/KBOWEBSITE/KT/php/logout.php";

            if(writeBtn){
                writeBtn.style.display = "block";
            }

        } else {

            loginUser.innerHTML = "비회원";
            loginLink.innerText = "로그인";
            loginLink.href = "ktlogin.html";

            if(writeBtn){
                writeBtn.style.display = "none";
            }
        }

    });
}
function initPage(){

    writeBtn =
        document.querySelector(
            ".write-area button"
        );

    loadBoard(1);

    // 검색 버튼 이벤트
    const searchBtn =
        document.getElementById(
            "searchBtn"
        );

    if(searchBtn){

        searchBtn.addEventListener(
            "click",
            searchBoard
        );

    }

    // 카드 클릭
    const boardList =
        document.getElementById(
            "boardList"
        );

    if(boardList){

        boardList.addEventListener(
            "click",
            function(e){

                const card =
                    e.target.closest(".card");

                if(!card) return;

                const no =
                    card.dataset.no;

                viewDetail(no);

            }
        );

    }

    // 엔터 검색
    const keywordInput =
        document.getElementById(
            "keyword"
        );

    if(keywordInput){

        keywordInput.addEventListener(
            "keydown",
            function(e){

                if(e.key === "Enter"){

                    searchBoard();

                }

            }
        );

    }

};

function loadBoard(
    page,
    type = '',
    keyword = ''
){

    fetch(
        `/KBOWEBSITE/KT/php/ktlist.php?page=${page}&type=${type}&keyword=${encodeURIComponent(keyword)}`
    )
    .then(res => res.json())
    .then(data => {
        
        // 로그인 체크
        if(data.result === "fail"){
        alert(data.msg);
        location.href = "ktlogin.html";
        return;
    }
        let html = '';

        if(data.list.length === 0){

            html = `
                <div class="empty">
                    검색 결과가 없습니다.
                </div>
            `;

        }else{

            data.list.forEach(item => {

                html += `
                    <article class="card"
                             data-no="${item.no}">

                        <div class="card-content">

                            <h3>${item.title}</h3>

                            <p class="writer">
                                작성자 : ${item.user_id}
                            </p>

                            <p class="message">
                                ${item.message}
                            </p>

                            <p class="date">
                                ${item.regdate}
                            </p>

                        </div>

                    </article>
                `;
            });

        }

        document.getElementById(
            "boardList"
        ).innerHTML = html;

        renderPaging(
            data.totalPages,
            page
        );

        if(writeBtn){

            writeBtn.classList.add(
                "show"
            );

        }

    })
    .catch(error => {

        console.error(error);

    });
}


function renderPaging(
    totalPages,
    currentPage
){

    let html = '';

    if(currentPage > 1){

        html += `
            <button
            onclick="loadBoard(
                ${currentPage - 1},
                currentType,
                currentKeyword
            )">
                이전
            </button>
        `;
    }

    for(let i = 1; i <= totalPages; i++){

        if(i === currentPage){

            html += `
                <button class="active">
                    ${i}
                </button>
            `;

        }else{

            html += `
                <button
                onclick="loadBoard(
                    ${i},
                    currentType,
                    currentKeyword
                )">
                    ${i}
                </button>
            `;
        }
    }

    if(currentPage < totalPages){

        html += `
            <button
            onclick="loadBoard(
                ${currentPage + 1},
                currentType,
                currentKeyword
            )">
                다음
            </button>
        `;
    }

    document.getElementById(
        "pagingArea"
    ).innerHTML = html;
}


function searchBoard(){

    currentType =
        document.getElementById(
            "searchType"
        ).value;

    currentKeyword =
        document.getElementById(
            "keyword"
        ).value.trim();

    loadBoard(
        1,
        currentType,
        currentKeyword
    );
}
