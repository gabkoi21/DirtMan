import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoute from "../Auth/AuthRoute";
import UserRoutes from "../Routes/UserRoutes";
import AdminRoutes from "../Routes/AdminRoutes";
import PageNav from "../Navigations/PageNav";

const App = () => {
  return (
    <Router>
      <PageNav />
      <Routes>
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
