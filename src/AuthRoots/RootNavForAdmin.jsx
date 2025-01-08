import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashBoard from "../AdminBoard/AdminDashBoard";
import Request from "../AdminBoard/Request";
import SendNotification from "../AdminBoard/SendNotification";
// import AdminNav from "./AdminNav";
import AdminNav from "../components/AdminNav";

const RootNavForAdmin = () => {
  return (
    <div>
      <AdminNav />
      <div className="lg:ml-[16%] p-4">
        {" "}
        {/* Add margin to account for fixed sidebar */}
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
