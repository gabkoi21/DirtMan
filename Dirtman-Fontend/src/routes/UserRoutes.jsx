import { NavLink, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiBell,
  mdiFaceManProfile,
  mdiAccountCircle,
  mdiClockTimeFiveOutline,
  mdiExitToApp,
} from "@mdi/js";
import PageNav from "../components/PageNav";
import useAuthStore from "../stores/authStore";

export const UserNav = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <header>
      <PageNav />
      <nav className="fixed top-0 left-0 h-full md:w-[18%] lg:w-[17%] md:bg-white md:shadow-lg overflow-y-auto">
        <div className="hidden md:flex lg:flex items-center md:space-x-1 px-3">
          <div className="lg:mt-3 text-gray-700">
            <Icon path={mdiAccountCircle} size={2} className="w-1/2 h-1/2" />
          </div>
          <div className="lg:mt-2">
            <a className="md:text-base xl:text-2xl font-bold text-black hover:text-nav transition duration-300 ease-in-out">
              Sulaiman Barry
            </a>
          </div>
        </div>

        <div className="block w-full px-3">
          <div className="!visible mt-2 hidden md:!block flex-grow basis-[100%] lg:mt-0 lg:!block lg:basis-auto">
            <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 xl:font-semibold">
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0 mt-10 xl:font-semibold">
                <NavLink
                  to="/Userdashboard/requests"
                  className={({ isActive }) =>
                    `flex items-center p-0 lg:px-2 ${
                      isActive ? "text-green-950 font-bold" : "text-black"
                    }`
                  }
                >
                  <Icon
                    path={mdiClockTimeFiveOutline}
                    size={1}
                    className="mr-2"
                  />
                  Schedule PickUp
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  to="/Userdashboard/notification" // Corrected path
                  className={({ isActive }) =>
                    `flex items-center p-0 lg:px-2 ${
                      isActive ? "text-green-950 font-bold" : "text-black"
                    }`
                  }
                >
                  <Icon path={mdiBell} size={1} className="mr-2" />
                  Notification
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  to="/Userdashboard/profile" // Corrected path
                  className={({ isActive }) =>
                    `flex items-center p-0 lg:px-2 ${
                      isActive ? "text-green-950 font-bold" : "text-black"
                    }`
                  }
                >
                  <Icon path={mdiFaceManProfile} size={1} className="mr-2" />
                  My Profile
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
        </div>
      </nav>
    </header>
  );
};

export default UserNav;
