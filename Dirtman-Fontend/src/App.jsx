import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

// This is the Authentication for the login screen
import Login from "./components/Login";

// These are the pages for the Admin end
import AdminLayout from "./components/AdminLayout";
import SendNotification from "./Pages/Admin/SendNotification";
import RequestManagement from "./Pages/Admin/RequestManagement";
import TaskManagement from "./Pages/Admin/TaskManagement";
import UserManagement from "./Pages/Admin/UserManagement";

// These are the pages for the user end
import UserLayout from "./components/UserLayout";
import MyRequest from "./Pages/User/MyRequest";
import Notification from "./Pages/User/Notification";
import Profile from "./Pages/User/Profile";
import AdminProfile from "./Pages/Admin/AdminProfile";

// These are the pages for the Driver
import DriversLayout from "./components/DriverLayout";
import Dashboard from "./Pages/Drivers/DriverDashboard";
import Notifications from "./Pages/Drivers/Notifications";
import AssignedPickup from "./Pages/Drivers/AssignedPickup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />

        {/* This is the nested route for the Admin board */}
        <Route path="Admindashboard" element={<AdminLayout />}>
          <Route index element={<Navigate to="servicerequest" />} />
          <Route path="sendnotification" element={<SendNotification />} />
          <Route path="servicerequest" element={<RequestManagement />} />
          <Route path="taskmanagement" element={<TaskManagement />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="adminprofile" element={<AdminProfile />} />
        </Route>

        {/* This is the the nested routes for the  User  board */}
        <Route path="Userdashboard" element={<UserLayout />}>
          <Route index element={<Navigate to="requests" />} />
          <Route path="requests" element={<MyRequest />} />
          <Route path="notification" element={<Notification />} />
          <Route path="userprofile" element={<Profile />} />
        </Route>

        {/* This is the the nested routes for the  Driver  board */}
        <Route path="Driversboard" element={<DriversLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="assignedpickup" element={<AssignedPickup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
