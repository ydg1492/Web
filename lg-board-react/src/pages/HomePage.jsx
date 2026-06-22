import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">

      <div className="home-card">

        <img
          src="/images/LG.png"
          alt="LG Twins"
          className="home-logo"
        />

        <h1>LG 트윈스 팬 커뮤니티</h1>

        <p>챔피언의 귀환</p>

        <Link
          to="/board"
          className="enter-btn"
        >
          게시판 입장
        </Link>

      </div>

    </div>
  );
}