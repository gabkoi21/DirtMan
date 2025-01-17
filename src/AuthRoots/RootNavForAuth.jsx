import { Routes, Route } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default AuthRoute;
