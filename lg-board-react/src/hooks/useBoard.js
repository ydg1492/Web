// hooks/useBoard.js
import { useEffect, useState } from "react";
import { boardApi } from "../api/boardApi";

export default function useBoard() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const loadBoard = async (pageNum = 1, type = "", key = "") => {
    const data = await boardApi.getList(pageNum, type, key);

    setList(data.list || []);
    setTotalPages(data.totalPages || 1);
    setPage(pageNum);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    loadBoard(1);
  }, []);

  return {
    list,
    page,
    totalPages,
    searchType,
    setSearchType,
    keyword,
    setKeyword,
    loadBoard,
    open,
    selectedPost,
    openModal,
    closeModal,
  };
}