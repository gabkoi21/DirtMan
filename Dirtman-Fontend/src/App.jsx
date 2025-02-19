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
import ServiceRequest from "./Pages/Admin/ServiceRequest";
import TaskManagement from "./Pages/Admin/TaskManagement";
import UserManagement from "./Pages/Admin/UserManagement";

// These are the pages for the user end
import UserLayout from "./components/UserLayout";
import MyRequest from "./Pages/User/MyRequest";
import Notification from "./Pages/User/Notification";
import Profile from "./Pages/User/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />

        {/* This is the nested route for the Admin board */}
        <Route path="Admindashboard" element={<AdminLayout />}>
          <Route index element={<Navigate to="servicerequest" />} />
          <Route path="sendnotification" element={<SendNotification />} />
          <Route path="servicerequest" element={<ServiceRequest />} />
          <Route path="taskmanagement" element={<TaskManagement />} />
          <Route path="usermanagement" element={<UserManagement />} />
        </Route>

        {/* This is the the nested routes for the  User  board */}
        <Route path="Userdashboard" element={<UserLayout />}>
          <Route index element={<Navigate to="requests" />} />
          <Route path="requests" element={<MyRequest />} />
          <Route path="notification" element={<Notification />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
