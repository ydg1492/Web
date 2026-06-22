window.addEventListener("DOMContentLoaded", function () {
document.addEventListener("click", function (e) {
  if (e.target.id === "cancelBtn") {
    history.back();
  }
  });

document.getElementById("registForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const msg = document.getElementById("msg").value.trim();

    if (!title || !msg) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", msg);

    fetch("/KBOWEBSITE/DS/php/dsregist.php", {
      method: "POST",
      body: formData
    })
    .then(res => {
      console.log("HTTP 상태:", res.status);
      return res.text();
    })
    .then(text => {
      console.log("서버 응답:", text);
 
      document.getElementById("registForm").reset();
      alert("등록 완료");
      location.href = "dsboard.html"; 
    })
    .catch(err => {
      console.error("진짜 에러:", err);
    });

  });

});