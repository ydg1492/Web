import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("id", id);
      formData.append("pw", pw);

      const res = await fetch(
        "http://localhost/lg-board-react/php/login.php",
        {
          method: "POST",
          body: formData,
          credentials: "include"
        }
      );

      const data = await res.json();

      if (data.result === "success") {

        alert("로그인 성공");

        navigate("/");

      } else {

        alert(data.msg);

      }

    } catch (error) {

      console.error(error);

      alert("서버 통신 중 오류가 발생했습니다.");

    }
  };

  const handleCancel = () => {

    navigate("/");

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>로그인</h2>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          <div className="button-group">

            <button type="submit">
              로그인
            </button>

            <button
              type="button"
              onClick={handleCancel}
            >
              취소
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;