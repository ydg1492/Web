import { useEffect, useState } from "react";
import { authApi } from "../api/authApi";

export default function useAuth() {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await authApi.checkLogin();
        setLoginUser(data.login ? data.user_id : null);
      } catch (err) {
        console.error(err);
      }
    };

    checkLogin();
  }, []);

  return { loginUser, setLoginUser };
}