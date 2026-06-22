window.addEventListener("DOMContentLoaded", function () {
document.addEventListener("click", function (e) {
  if (e.target.id === "cancelBtn") {
    history.back();
  }
  });

  document.getElementById("joinForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const pw1 = document.getElementById("pw1").value.trim();
    const pw2 = document.getElementById("pw2").value.trim();

    if (!id || !pw1 || !pw2) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    if (pw1 !== pw2) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("pw1", pw1);
    formData.append("pw2", pw2);

    fetch("/KBOWEBSITE/HW/php/hwjoin.php", {
      method: "POST",
      body: formData
    })
    .then(res => {
      console.log("HTTP 상태:", res.status);
      return res.text();
    })
    .then(text => {
      console.log("서버 응답:", text);

      document.getElementById("joinForm").reset();
      alert("등록 완료");
      location.href = "hwboard.html"; 
    })
    .catch(err => {
      console.error("진짜 에러:", err);
    });

  });

});