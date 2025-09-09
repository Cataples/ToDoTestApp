import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchWithAuth = async (url, options = {}) => {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
      throw new Error("Unauthorized");
    }

    return res;
  };

  const getTags = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/tags");
      if (!res.ok) throw new Error("Failed to fetch tags");
      const data = await res.json();
      setTags(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const assignTag = async (task_id, tag_id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/tags/assign", {
        method: "PUT",
        body: JSON.stringify({ task_id, tag_id }),
      });
      if (!res.ok) throw new Error("Failed to assign tag");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeTag = async (task_id, tag_id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/tags/remove", {
        method: "PUT",
        body: JSON.stringify({ task_id, tag_id }),
      });
      if (!res.ok) throw new Error("Failed to remove tag");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTags();
    // eslint-disable-next-line
  }, []);

  return {
    tags,
    loading,
    error,
    assignTag,
    removeTag,
  };
};

export default useTags;
