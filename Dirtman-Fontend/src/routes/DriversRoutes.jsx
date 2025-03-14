// External Dependencies
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiBell, mdiBriefcaseCheck } from "@mdi/js";

// Internal Dependencies
import PageNav from "../components/PageNav";

// Navigation configuration
const NAV_ITEMS = [
  {
    to: "/Driversboard/dashboard",
    label: "Dashboard",
    icon: mdiBriefcaseCheck,
    ariaLabel: "Dashboard",
  },
  {
    to: "/Driversboard/assignedpickup",
    label: "Assigned PickUp",
    icon: mdiBell,
    ariaLabel: "Assigned PickUp",
  },
  {
    to: "/Driversboard/notification",
    label: "Notifications",
    icon: mdiBell,
    ariaLabel: "Notifications",
  },
];

export const DriverNav = () => {
  return (
    <header>
      <PageNav />
      <nav className="fixed top-0 left-0 right-2 h-full w-[20%] bg-white shadow-lg overflow-y-auto z-10">
        <div className="lg:mt-2 ml-4 mb-10 mt-5">
          <p className="text-2xl  font-bold whitespace-nowrap font-roboto">
            John Peter Paul
          </p>
        </div>

        <div className="block w-full px-3">
          <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 font-roboto whitespace-nowrap">
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
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default DriverNav;
