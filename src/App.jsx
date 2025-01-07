import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNav from "./components/PageNav";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PickupSchedule from "./pages/SchedulePickup";
import DashBoard from "./pages/DashBoard";
import Logout from "./pages/Logout";
import Notification from "./pages/Notification";
import MyRequest from "./pages/MyRequest";

// Authentication pages
import Login from "./pages/Login";
import Register from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <PageNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedulepickup" element={<PickupSchedule />} />
        <Route path="/dishboard" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="#" element={<Logout />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/requests" element={<MyRequest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
