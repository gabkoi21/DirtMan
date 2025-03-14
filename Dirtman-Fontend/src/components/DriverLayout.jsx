import { Outlet } from "react-router-dom";
import { DriverNav } from "../routes/DriversRoutes";

function AdminLayout() {
  return (
    <div>
      <DriverNav />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
