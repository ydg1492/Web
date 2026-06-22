import { useEffect, useState } from "react";
import { boardApi } from "../api/boardApi";
import { useNavigate } from "react-router-dom";

export default function useBoardModify(no) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =====================
  // 기존 데이터 로딩
  // =====================
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await boardApi.detail(no);

        if (!data || data.result === "fail") {
          alert(data.msg || "데이터 로딩 실패");
          navigate("/board");
          return;
        }

        setTitle(data.title || "");
        setMessage(data.message || "");
      } catch (err) {
        console.error(err);
        alert("서버 오류");
        navigate("/board");
      }
    };

    loadData();
  }, [no, navigate]);

  // =====================
  // 수정 submit
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message) {
      alert("제목과 내용을 입력하세요");
      return;
    }

    setLoading(true);

    try {
      const res = await boardApi.update(no, title, message);

      if (res.result === "success") {
        alert("수정 완료");
        navigate("/board");
      } else {
        alert(res.msg || "수정 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // 취소
  // =====================
  const handleCancel = () => {
    if (!title.trim() && !message.trim()) {
      navigate("/board");
      return;
    }

    if (window.confirm("수정을 취소하시겠습니까?")) {
      navigate("/board");
    }
  };

  return {
    title,
    setTitle,
    message,
    setMessage,
    loading,
    handleSubmit,
    handleCancel,
  };
}