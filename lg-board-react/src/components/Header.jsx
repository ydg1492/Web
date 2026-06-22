import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

export default function Header({ loginUser, setLoginUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authApi.logout();
    setLoginUser(null);
    navigate("/board");
  };

  return (
    <header className="header">
      <div className="team-info">

        <div className="left-box">
          <img src="/images/LG.png" alt="LG" />
          <div className="team-text">
            <h1>LG 트윈스</h1>
            <p>챔피언의 귀환 (The Return of Champions)</p>
          </div>
        </div>

        <div className="menu-wrapper">
          <nav className="menu">

            <Link className="menu-item" to="/join">
              회원가입
            </Link>

            {loginUser ? (
              <button className="menu-item" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <Link className="menu-item" to="/login">
                로그인
              </Link>
            )}

          </nav>

          {loginUser && (
            <div className="login-user">
              {loginUser}님이 로그인 중입니다.
            </div>
          )}
        </div>

      </div>
    </header>
  );
}