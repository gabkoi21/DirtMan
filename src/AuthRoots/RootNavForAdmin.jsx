import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashBoard from "../AdminBoard/AdminDashBoard";
import Request from "../AdminBoard/UserManagement";
import SendNotification from "../AdminBoard/SendNotification";
import ServiceRequest from "../AdminBoard/ServiceRequest";
import AdminNav from "../Navigations/AdminNav";
import TaskManagement from "../AdminBoard/TaskManagement";

const RootNavForAdmin = () => {
  return (
    <div>
      <AdminNav />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="allrequests" element={<Request />} />
          <Route path="sendnotification" element={<SendNotification />} />
          <Route path="taskmanagement" element={<TaskManagement />} />
          <Route path="servicerequest" element={<ServiceRequest />} />
        </Routes>
      </div>
    </div>
  );
};

export default RootNavForAdmin;
