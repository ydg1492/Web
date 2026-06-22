const BOARD_API_BASE_URL = "http://localhost/lg-board-react/php";
export const boardApi = {
  // =====================
  // 게시물리스트
  // =====================
  getList: async (page, type, keyword) => {
    const res = await fetch(
      `${BOARD_API_BASE_URL}/board_list.php?page=${page}&type=${type}&keyword=${encodeURIComponent(keyword)}`
    );
    return res.json();
  },
   
   // =====================
   // 게시물상세
  // =====================
  detail: async (no) => {
  const formData = new FormData();
  formData.append("no", no);

  const res = await fetch(
    `${BOARD_API_BASE_URL}/board_detail.php`,
    {
      method: "POST",
      body: formData,
      credentials: "include"
    }
  );

  return res.json();
},

  // =====================
  // 게시물등록
  // =====================
  write: async (title, message) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("message", message);

  const res = await fetch(
    `${BOARD_API_BASE_URL}/board_insert.php`,
    {
      method: "POST",
      body: formData,
      credentials: "include"
    }
  );

  return res.json();
  },

  // =====================
  // 게시물수정
  // =====================
  update: async (no, title, message) => {
    const formData = new FormData();

    formData.append("no", no);
    formData.append("title", title);
    formData.append("message", message);

    const res = await fetch(
      `${BOARD_API_BASE_URL}/board_update.php`,
      {
        method: "POST",
        body: formData,
        credentials: "include"
      }
    );

    return res.json();
  },

  // =====================
  // 게시물삭제
  // =====================
  delete: async (no) => {
    const formData = new FormData();

    formData.append("no", no);
    const res = await fetch(
      `${BOARD_API_BASE_URL}/board_delete.php`,
      {
        method: "POST",
        body: formData,
        credentials: "include"
      }
    );

    return res.json();
  },
};
