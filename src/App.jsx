import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import { LoginPage } from "views/admin/login/login";
import { Register } from "views/admin/register/register";

import Cookies from "js-cookie";

const App = () => {
  return (
    <Routes>
      <Route path="/admin*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login/*" element={<LoginPage />} />
      <Route path="register/*" element={<Register />} />
    </Routes>
  );
};

export default App;
