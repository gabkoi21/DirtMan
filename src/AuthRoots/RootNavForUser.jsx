import { Routes, Route } from "react-router-dom";

import Requests from "../UserBoard/MyRequest";
import Notification from "../UserBoard/Notification";
import Profile from "../UserBoard/Profile";
import UserNav from "../components/UserNav";

const RootNavForUser = () => {
  return (
    <div>
      <UserNav />
      <div>
        <Routes>
          <Route path="requests" element={<Requests />} />
          <Route path="notification" element={<Notification />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default RootNavForUser;
