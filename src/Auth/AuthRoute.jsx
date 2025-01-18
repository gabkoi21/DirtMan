import { Routes, Route, NavLink } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  return (
    <div>
      {/* Navigation for Auth */}
      <nav>
        <NavLink to="/auth/login" className="auth-link">
          Login
        </NavLink>
        <NavLink to="/auth/register" className="auth-link">
          Register
        </NavLink>
      </nav>

      {/* Routes for Auth */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Auth;
