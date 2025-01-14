import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiClose,
  mdiCalendarClock,
  mdiBell,
  mdiFaceManProfile,
  mdiExitToApp,
} from "@mdi/js";

const MobileNav = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isMenuOpen, toggleMenu } = props;
  const handleLinkClick = () => {
    event.preventDefault();
    toggleMenu();
  };

  return (
    <header>
      <nav className="fixed top-0 right-0 h-full w-[70%] md:w-[16%] bg-white shadow-lg overflow-y-auto">
        {/* Mobile Menu Toggle */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-xl font-bold text-black">Sulaiman Barry</h1>
          <div onClick={toggleMenu}>
            <Icon path={isMenuOpen && mdiClose} size={1} className="mr-2" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`mobile-nav ${isMenuOpen ? "Show" : "hide"} `}>
          <ul className="list-style-none flex flex-col space-y-6 mt-2  px-5 text-xl">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-green-950" : "text-black"
                  }`
                }
                to="/user/requests"
                onClick={handleLinkClick}
              >
                <Icon path={mdiCalendarClock} size={1} className="mr-2" />
                PickUp
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-green-950" : "text-black"
                  }`
                }
                to="/user/notification"
                onClick={handleLinkClick}
              >
                <Icon path={mdiBell} size={1} className="mr-2 " />
                Notification
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-green-950" : "text-black"
                  }`
                }
                to="/user/profile"
                onClick={handleLinkClick}
              >
                <Icon path={mdiFaceManProfile} size={1} className="mr-2 " />
                My Profile
              </NavLink>
            </li>
            <li>
              <button className="flex items-center text-black">
                <Icon path={mdiExitToApp} size={1} className="mr-2  " />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MobileNav;
