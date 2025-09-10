import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    setUsername: handleUsernameChange,
    setPassword: handlePasswordChange,
    login,
    loading,
    error,
  };
};

export default useLogin;
