import { NavLink } from "react-router-dom";
// import Icon from "@mdi/react";
// import { mdiLogin, mdiAccountPlus } from "@mdi/js";

const PageNav = () => {
  return (
    <header>
      <nav className="fixed top-0  left-1/6 right-0 z-50 flex w-[100%] md:w-[84%]  lg:flex-wrap  lg:py-2 bg-nav">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2">
            <a className="text-3xl text-white font-semibold" href="#">
              DirtMan
            </a>
          </div>
          {/* <div className="flex items-center ml-auto">
            <NavLink className="p-0 text-white lg:px-1" to="/login">
              <Icon path={mdiLogin} title="Login" size={1} />
            </NavLink>
            <NavLink className="p-0 text-white lg:px-2" to="/register">
              <Icon path={mdiAccountPlus} title="Register" size={1} />
            </NavLink>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default PageNav;
