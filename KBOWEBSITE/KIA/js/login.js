window.addEventListener("DOMContentLoaded", function () {
document.addEventListener("click", function (e) {
  if (e.target.id === "cancelBtn") {
    history.back();
  }
  });

  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const pw = document.getElementById("pw").value.trim();

    if (!id || !pw ) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("pw", pw);

   fetch("/KBOWEBSITE/KIA/php/kialogin.php", {
    method: "POST",
    body: formData
})
.then(res => res.json())
.then(data => {

    if(data.result === "success"){
        alert("로그인 완료");
        location.href = "kiaboard.html";
    }else{
        alert(data.msg);
    }

})
.catch(err => {
    console.error(err);
});

  });

});