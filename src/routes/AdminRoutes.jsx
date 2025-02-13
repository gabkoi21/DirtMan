import { NavLink, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiBell,
  mdiAccountCircle,
  mdiBriefcaseCheck,
  mdiExitToApp,
} from "@mdi/js";

import PageNav from "../components/PageNav";
import useAuthStore from "../stores/authStore";

export const AdminNav = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <header>
      <PageNav />
      <nav className="fixed top-0 left-0 h-full w-[17%] bg-white shadow-lg overflow-y-auto z-10">
        <div className="lg:mt-2 ml-7 mb-10 mt-5">
          <p className="text-4xl font-bold">Admin</p>
        </div>
        <div className="block w-full px-3">
          <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1">
            <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
              <NavLink
                to="servicerequest"
                className={({ isActive }) =>
                  `flex items-center p-0 ${
                    isActive ? "text-green-950" : "text-black"
                  } lg:px-2`
                }
                aria-label="Service Request"
              >
                <Icon path={mdiBriefcaseCheck} size={1} className="mr-2" />
                Service Request
              </NavLink>
            </li>

            <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
              <NavLink
                to="usermanagement"
                className={({ isActive }) =>
                  `flex items-center p-0 ${
                    isActive ? "text-green-950" : "text-black"
                  } lg:px-2`
                }
                aria-label="User Management"
              >
                <Icon path={mdiAccountCircle} size={1} className="mr-2" />
                User Management
              </NavLink>
            </li>

            <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
              <NavLink
                to="taskmanagement"
                className={({ isActive }) =>
                  `flex items-center p-0 ${
                    isActive ? "text-green-950" : "text-black"
                  } lg:px-2`
                }
                aria-label="Task Management"
              >
                <Icon path={mdiBell} size={1} className="mr-2" />
                Task Management
              </NavLink>
            </li>

            <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
              <NavLink
                to="sendnotification"
                className={({ isActive }) =>
                  `flex items-center p-0 ${
                    isActive ? "text-green-950" : "text-black"
                  } lg:px-2`
                }
                aria-label="Send Notification"
              >
                <Icon path={mdiBell} size={1} className="mr-2" />
                Send Notification
              </NavLink>
            </li>

            {/* Logout Button with Icon */}
            <li>
              <button
                onClick={handleClick}
                className="flex items-center mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0"
              >
                <Icon path={mdiExitToApp} size={1} className="mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
