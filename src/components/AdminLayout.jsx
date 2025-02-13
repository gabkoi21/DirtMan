// AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNav } from "../routes/AdminRoutes";

function AdminLayout() {
  return (
    <div>
      <AdminNav />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
