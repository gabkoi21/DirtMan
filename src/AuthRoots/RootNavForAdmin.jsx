import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashBoard from "../AdminBoard/AdminDashBoard";
import Request from "../AdminBoard/AllRequest";
import SendNotification from "../AdminBoard/SendNotification";
// import AdminNav from "./AdminNav";
import AdminNav from "../Navigations/AdminNav";

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
        </Routes>
      </div>
    </div>
  );
};

export default RootNavForAdmin;
