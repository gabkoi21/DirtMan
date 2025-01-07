import { Routes, Route } from "react-router-dom";
import Home from "../UserBoard/Home";
import Profile from "../UserBoard/Profile";
import PickupSchedule from "../UserBoard/SchedulePickup";
import DashBoard from "../UserBoard/DashBoard";
import Logout from "../UserBoard/Logout";
import Notification from "../UserBoard/Notification";
import MyRequest from "../UserBoard/MyRequest";
import Login from "../UserBoard/Login";

const RootNavForUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/schedulepickup" element={<PickupSchedule />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/requests" element={<MyRequest />} />
    </Routes>
  );
};

export default RootNavForUser;
