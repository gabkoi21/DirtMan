import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiViewDashboard, mdiBell, mdiFileDocument } from "@mdi/js";

const AdminNav = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 h-full w-[16%] bg-white shadow-lg overflow-y-auto z-10 hidden lg:block">
        <div className="lg:mt-2 ml-7 mb-10 mt-5">
          <p className="text-4xl font-bold">Admin</p>
        </div>

        <div className="block w-full px-3">
          <div className="!visible mt-2 hidden flex-grow basis-[100%] lg:mt-0 lg:!block lg:basis-auto">
            <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1">
              {/* Dashboard */}
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

              {/* All Requests */}
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/admin/allrequests"
                >
                  <Icon path={mdiFileDocument} size={1} className="mr-2" />
                  All Requests
                </NavLink>
              </li>

              {/* Send Notification */}
              <li className="mb-4 ps-2 lg:mb-8 lg:pe-1 lg:ps-0">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center p-0 ${
                      isActive ? "text-green-950" : "text-black"
                    } lg:px-2`
                  }
                  to="/admin/sendnotification"
                >
                  <Icon path={mdiBell} size={1} className="mr-2" />
                  Send Notification
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminNav;
