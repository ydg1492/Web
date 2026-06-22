import { useNavigate } from "react-router-dom";

export default function useBoardActions() {
  const navigate = useNavigate();

  const goWrite = (loginUser) => {
    if (!loginUser) {
      alert("로그인 후 게시글 작성이 가능합니다");
      return;
    }
    navigate("/board/write");
  };

  const goModify = (no) => {
    navigate(`/board/${no}/edit`);
  };
  
  const goDelete = (no) => {
    navigate(`/board/${no}/delete`);
  };
  return {
    goWrite,
    goModify,
    goDelete,
  };
}