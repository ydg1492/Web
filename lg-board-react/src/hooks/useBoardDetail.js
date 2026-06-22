import { useEffect, useState } from "react";
import { boardApi } from "../api/boardApi";
import { useNavigate } from "react-router-dom";

export default function useBoardDetail(no) {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetail = async () => {
      const data = await boardApi.detail(no);
      setPost(data);
    };

    loadDetail();
  }, [no]);

  const goEdit = () => {
    navigate(`/board/${no}/edit`);
  };

  return {
    post,
    goEdit,
  };
}