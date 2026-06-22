function checkLogin() {

    fetch("/KBOWEBSITE/KIA/php/login_check.php")
    .then(res => res.json())
    .then(data => {

        console.log(data);

        const loginUser = document.getElementById("loginUser");
        const loginLink = document.getElementById("loginLink");

        if(data.login){

            loginUser.textContent =
                data.user_id + "님 로그인 중";

            loginLink.textContent = "로그아웃";
            loginLink.href = "/KBOWEBSITE/KIA/php/logout.php";

            initPage();

        }else{

            alert("로그인이 필요합니다.");
            location.href = "kialogin.html";

        }

    });

}