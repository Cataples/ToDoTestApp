import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
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
      navigate("/login");
      throw new Error("Unauthorized");
    }

    return res;
  };

  const getTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task_name, description) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/tasks", {
        method: "POST",
        body: JSON.stringify({ task_name, description }),
      });
      if (!res.ok) throw new Error("Failed to create task");
      await getTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskDone = async (task_id, is_done) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/tasks/${task_id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_done }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      await getTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    toggleTaskDone,
  };
};

export default useTasks;
