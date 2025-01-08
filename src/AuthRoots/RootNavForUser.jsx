import { Routes, Route, Navigate } from "react-router-dom";

import SchedulePickup from "../UserBoard/SchedulePickup";
import Requests from "../UserBoard/MyRequest";
import Notification from "../UserBoard/Notification";
import Profile from "../UserBoard/Profile";
import UserNav from "../components/UserNav";

const RootNavForUser = () => {
  return (
    <div>
      <UserNav />
      <div className="lg:ml-[16%] p-4">
        {" "}
        {/* Add margin to account for fixed sidebar */}
        <Routes>
          <Route path="/" element={<Navigate to="schedulepickup" />} />
          <Route path="schedulepickup" element={<SchedulePickup />} />
          <Route path="requests" element={<Requests />} />
          <Route path="notification" element={<Notification />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default RootNavForUser;
