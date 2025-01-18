import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiBell,
  mdiAccountCircle,
  mdiExitToApp,
  mdiBriefcaseCheck,
} from "@mdi/js";

import AdminDashBoard from "../Pages/Admin/AdminDashBoard";
import SendNotification from "../Pages/Admin/SendNotification";
import ServiceRequest from "../Pages/Admin/ServiceRequest";
import TaskManagement from "../Pages/Admin/TaskManagement";
import UserManagement from "../Pages/Admin/UserManagement";

export const AdminNav = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 h-full w-[17%] bg-white shadow-lg overflow-y-auto z-10">
        <div className="lg:mt-2 ml-7 mb-10 mt-5">
          <p className="text-4xl font-bold">Admin</p>
        </div>
        <div className="block w-full px-3">
          <div className="!visible mt-2 hidden flex-grow basis-[100%] lg:mt-0 lg:!block lg:basis-auto">
            <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1">
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/admin/dashboard"
                >
                  <Icon path={mdiViewDashboard} size={1} className="mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/admin/usermanagement"
                >
                  <Icon
                    path={mdiAccountCircle}
                    size={1}
                    className="whitespace-nowrap mr-1"
                  />
                  User Management
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/admin/servicerequest"
                >
                  <Icon path={mdiBriefcaseCheck} size={1} className="mr-2" />
                  Service Request
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/admin/taskmanagement"
                >
                  <Icon path={mdiBell} size={1} className="mr-2" />
                  Task Management
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                >
                  <Icon path={mdiExitToApp} size={1} className="mr-2" />
                  LogOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const AdminRoutes = () => {
  return (
    <>
      <AdminNav /> {/* Place AdminNav outside of <Routes> */}
      <Routes>
        <Route path="dashboard" element={<AdminDashBoard />} />
        <Route path="sendnotification" element={<SendNotification />} />
        <Route path="servicerequest" element={<ServiceRequest />} />
        <Route path="taskmanagement" element={<TaskManagement />} />
        <Route path="usermanagement" element={<UserManagement />} />
        <Route path="/" element={<Navigate to="dashboard" />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
