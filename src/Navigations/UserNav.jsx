import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiBell,
  mdiExitToApp,
  mdiFaceManProfile,
  mdiAccountCircle,
  // mdiCalendarClock,
  mdiClockTimeFiveOutline,
} from "@mdi/js";

const UserNav = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 h-full md:w-[18%] xl:w-[16%] md:bg-white md:shadow-lg overflow-y-auto ">
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
            <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1  xl:font-semibold">
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0 mt-10 xl:font-semibold">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/user/requests"
                >
                  <Icon
                    path={mdiClockTimeFiveOutline}
                    size={1}
                    className="mr-2"
                  />
                  PickUp
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0 xl:font-semibold">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/user/notification"
                >
                  <Icon path={mdiBell} size={1} className="mr-2" />
                  Notification
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0 xl:font-semibold">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/user/profile"
                >
                  <Icon path={mdiFaceManProfile} size={1} className="mr-2" />
                  My Profile
                </NavLink>
              </li>
              <li className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0  xl:font-semibold">
                <button className="flex items-center p-0 text-black lg:px-2">
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
