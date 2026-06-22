import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

function JoinPage() {

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await authApi.join(
        id,
        pw1,
        pw2
      );

      if (data.result === "success") {

        alert("회원가입이 완료되었습니다.");

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
    <div className="join-container">

      <div className="join-card">

        <h2>회원가입</h2>

        <form
          className="join-form"
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
            value={pw1}
            onChange={(e) => setPw1(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호 확인"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
          />

          <div className="button-group">

            <button type="submit">
              가입하기
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

export default JoinPage;