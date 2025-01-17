import { NavLink } from "react-router";

export function MyAppNav() {
  return (
    <nav>
      <NavLink to="login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
}
