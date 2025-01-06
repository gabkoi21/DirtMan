import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLogin, mdiAccountPlus } from "@mdi/js";

const PageNav = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between py-2 lg:flex-wrap lg:justify-start lg:py-4 bg-nav shadow-lg">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2">
            <a className="text-4xl text-white " href="#">
              DirtMan
            </a>
          </div>
          <div className="flex items-center ml-auto">
            <NavLink className="p-0 text-white lg:px-1" to="/login">
              <Icon path={mdiLogin} title="Login" size={1} />
            </NavLink>
            <NavLink className="p-0 text-white lg:px-2" to="/register">
              <Icon path={mdiAccountPlus} title="Register" size={1} />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PageNav;
