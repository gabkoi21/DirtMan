import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../AdminBoard/AdminDashBoard";

const RootNavForAdmin = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default RootNavForAdmin;
