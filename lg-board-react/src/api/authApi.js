  const AUTH_API_BASE_URL = "http://localhost/lg-board-react/php";

  export const authApi = {
  
  // =====================
  // 로그인
  // =====================
  login: async (id, pw) => {

  const formData = new FormData();

  formData.append("id", id);
  formData.append("pw", pw);

  const res = await fetch(
    `${AUTH_API_BASE_URL}/login.php`,
    {
      method: "POST",
      body: formData,
      credentials: "include"
    }
  );

  return res.json();
 },
  
  // =====================
  // 로그아웃
  // =====================
  logout: async () => {
    const res = await fetch(
      `${AUTH_API_BASE_URL}/logout.php`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    return res.json();
  },

  // =====================
  // 회원가입
  // =====================
  join: async (id, pw1, pw2) => {

   const formData = new FormData();

    formData.append("id", id);
    formData.append("pw1", pw1);
    formData.append("pw2", pw2);

    const res = await fetch(
      `${AUTH_API_BASE_URL}/join.php`,
      {
        method: "POST",
        body: formData,
        credentials: "include"
      }
    );

    return res.json();
  },
  
   // =====================
   // 로그인체크
   // =====================
   checkLogin: async () => {

   const res = await fetch(
     `${AUTH_API_BASE_URL}/login_check.php`,
     {
       credentials: "include"
     }
   );
   return res.json();
 }
  
}