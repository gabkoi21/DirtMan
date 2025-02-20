// External Dependencies
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiBell,
  mdiAccountCircle,
  mdiBriefcaseCheck,
  mdiExitToApp,
} from "@mdi/js";

// Internal Dependencies
import AdninHeaderNav from "../components/AdminHeaderNav";
import useAuthStore from "../stores/authStore";

// Navigation configuration
const NAV_ITEMS = [
  {
    to: "servicerequest",
    label: "Request Management",
    icon: mdiBriefcaseCheck,
    ariaLabel: "Service Request",
  },
  {
    to: "usermanagement",
    label: "User Management",
    icon: mdiAccountCircle,
    ariaLabel: "User Management",
  },
  {
    to: "taskmanagement",
    label: "Task Management",
    icon: mdiBell,
    ariaLabel: "Task Management",
  },
  {
    to: "sendnotification",
    label: "Send Notification",
    icon: mdiBell,
    ariaLabel: "Send Notification",
  },
];

export const AdminNav = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <AdninHeaderNav />
      {/* Main Navigation Sidebar */}
      <nav className="fixed top-0 left-0 right-2 h-full w-[20%] bg-white shadow-lg overflow-y-auto z-10 ">
        {/* Logo/Brand Section */}
        <div className="lg:mt-2 ml-4 mb-10 mt-5">
          <p className="text-2xl font-bold whitespace-nowrap font-roboto">
            People of Waste
          </p>
        </div>

        {/* Navigation Links */}
        <div className="block w-full px-3">
          <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 font-roboto  whitespace-nowrap">
            {/* Render Navigation Items */}
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  aria-label={item.ariaLabel}
                >
                  <Icon
                    path={item.icon}
                    size={0.8}
                    title={item.label}
                    className="mr-2 inline-block"
                  />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0 text-black hover:text-green-950"
                aria-label="Logout"
              >
                <Icon
                  path={mdiExitToApp}
                  size={1}
                  title="Logout"
                  className="mr-2 inline-block"
                />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
