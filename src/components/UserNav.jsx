import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiBell,
  mdiExitToApp,
  mdiFaceManProfile,
  mdiClockOutline,
  mdiAccountCircle,
} from "@mdi/js"; // Import necessary icons

const UserNav = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 h-full w-[16%] bg-white shadow-lg overflow-y-auto z-10 hidden lg:block">
        {/* Navigation Content */}

        <div className="flex items-center space-x-4 px-3">
          {/* Icon */}
          <div className="lg:mt-3 text-gray-700">
            <Icon path={mdiAccountCircle} size={2} className="w-1/2 h-1/2" />
          </div>

          {/* Username */}
          <div className="lg:mt-2">
            <a
              className="text-xl font-bold text-black hover:text-blue-600 "
              href="#"
            >
              Sulaiman Barry
            </a>
          </div>
        </div>

        <div className="block w-full px-3">
          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] lg:mt-0 lg:!block lg:basis-auto"
            id="navbarSupportedContent2"
            data-twe-collapse-item
          >
            <ul
              className="list-style-none me-auto flex flex-col ps-0 lg:mt-1"
              data-twe-navbar-nav-ref
            >
              <li
                className="mb-4 ps-2 lg:mb-8 lg:mt-5 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <NavLink
                  className="flex items-center p-0 text-black lg:px-2"
                  to="/dishboard"
                >
                  <Icon path={mdiViewDashboard} size={1} className="mr-2" />
                  DashBoard
                </NavLink>
              </li>
              <li
                className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <NavLink
                  className="flex items-center p-0 text-black lg:px-2"
                  to="/schedulepickup"
                >
                  <Icon path={mdiClockOutline} size={1} className="mr-2" />
                  Schedule Pickup
                </NavLink>
              </li>
              <li
                className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <NavLink
                  className="flex items-center p-0 text-black lg:px-2"
                  to="/notification"
                >
                  <Icon path={mdiBell} size={1} className="mr-2" />
                  Notification
                </NavLink>
              </li>
              <li
                className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <NavLink
                  className="flex items-center p-0 text-black lg:px-2"
                  to="/profile"
                >
                  <Icon path={mdiFaceManProfile} size={1} className="mr-2" />
                  My Profile
                </NavLink>
              </li>
              <li
                className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
              >
                <NavLink
                  className="flex items-center p-0 text-black lg:px-2"
                  to="/logout"
                >
                  <Icon path={mdiExitToApp} size={1} className="mr-2" />
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserNav;
