import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "../routes/UserRoutes";

const UserLayout = () => {
  return (
    <div>
      <UserNav />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
