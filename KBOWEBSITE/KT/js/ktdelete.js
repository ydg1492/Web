window.addEventListener("DOMContentLoaded", function () {

  // 취소 버튼
  const cancelBtn = document.getElementById("cancelBtn");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      history.back();
    });
  }

  // URL에서 글 번호 가져오기
  const params = new URLSearchParams(location.search);
  const no = params.get("no");

  const form = document.getElementById("deleteForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!no) {
      alert("잘못된 접근입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("no", no);

    fetch("/KBOWEBSITE/KT/php/ktdelete.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {

      console.log("서버 응답:", data);

      if (data.result === "success") {
        alert("삭제 완료");
        location.href = "ktboard.html";
      } else {
        alert(data.msg);
      }

    })
    .catch(err => {
      console.error("에러:", err);
      alert("서버 오류 발생");
    });

  });

});