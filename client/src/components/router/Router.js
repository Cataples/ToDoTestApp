import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Login } from "../../pages/Login/Login";
import { Tasks } from "../../pages/Tasks/Tasks";
import { UnexistingPage } from "../../pages/UnexistingPage/UnexistingPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="*" element={<UnexistingPage />} />
      </Routes>
    </BrowserRouter>
  );
};
