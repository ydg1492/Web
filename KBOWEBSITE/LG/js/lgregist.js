window.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("registForm");
  const titleInput = document.getElementById("title");
  const msgInput = document.getElementById("msg");

  if (!form) return;

  document.addEventListener("click", function (e) {
    if (e.target.id === "cancelBtn") {
      history.back();
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const msg = msgInput.value.trim();

    if (!title || !msg) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", msg);

    try {

      const res = await fetch("/KBOWEBSITE/LG/php/lgregist.php", {
        method: "POST",
        body: formData
      });

      //HTTP 실패 체크
      if (!res.ok) {
        throw new Error("HTTP Error: " + res.status);
      }

      const data = await res.json();

      console.log("서버 응답:", data);

      //실패
      if (data.result === "fail") {
        alert(data.msg);
        return;
      }

      //성공
      alert("등록 완료");

      //중복 제출 방지
      form.querySelector("button[type='submit']")?.setAttribute("disabled", true);

      form.reset();
      location.href = "lgboard.html";

    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }

  });

});

