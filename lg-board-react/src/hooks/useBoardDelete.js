import { useState } from "react";
import { boardApi } from "../api/boardApi";
import { useNavigate, useParams } from "react-router-dom";

export default function useBoardDelete() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { no } = useParams();

  const handleDelete = async () => {
    if (!no) {
      alert("게시물 번호 없음");
      return;
    }

    const deleteConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!deleteConfirm) return;

    setLoading(true);

    try {
      const res = await boardApi.delete(no);

      if (res.result === "success") {
        alert("삭제 완료");
        navigate("/board");
      } else {
        alert(res.msg || "삭제 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/board");
  };

  return {
    loading,
    handleDelete,
    handleCancel,
  };
}