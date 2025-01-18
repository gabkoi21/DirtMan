import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoute from "../Auth/AuthRoute";
import UserRoutes from "../Routes/UserRoutes"; // Here we import UserRoutes
import AdminRoutes from "../Routes/AdminRoutes"; // Import AdminRoutes
import PageNav from "../Navigations/PageNav";

const App = () => {
  return (
    <Router>
      <PageNav />
      <Routes>
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/user/*" element={<UserRoutes />} />
        {/* Temporarily render UserRoutes instead of AdminRoutes */}
        <Route path="/admin/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
