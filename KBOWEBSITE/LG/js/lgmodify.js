window.addEventListener("DOMContentLoaded", function () {
  
 document.addEventListener("click", function (e) {
  if (e.target.id === "cancelBtn") {
    history.back();
  }
  });

  const params = new URLSearchParams(location.search);
  const no = params.get("no");

  const form = document.getElementById("modifyForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const msg = document.getElementById("msg").value.trim();

    const formData = new FormData();

    formData.append("no", no);
    formData.append("title", title);
    formData.append("msg", msg);

    fetch("/KBOWEBSITE/LG/php/lgmodify.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {

      console.log("서버 응답:", data);

      if (data.result === "success") {
        alert("수정 완료");
        location.href = "lgboard.html";
      } else {
        alert(data.msg);
      }

    })
    .catch(err => {
      console.error("에러:", err);
    });

  });
  
});