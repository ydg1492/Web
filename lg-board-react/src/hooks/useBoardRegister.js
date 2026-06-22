import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { boardApi } from "../api/boardApi";

export default function useBoardRegister() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !message) {
    alert("제목과 내용을 입력하세요");
    return;
  }

  setLoading(true);

  try {
    const res = await boardApi.write(title, message);

    if (res.result === "success") {
      alert("등록 완료");
      navigate("/board");
    }
  } finally {
    setLoading(false);
  }
};

const handleCancel = () => {
  setTitle("");
  setMessage("");
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