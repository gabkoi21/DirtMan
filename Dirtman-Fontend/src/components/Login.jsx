import { mdiEye, mdiEyeOff } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      const isSuccess = login(email, password);

      if (isSuccess) {
        if (user?.role === "admin") {
          navigate("/Admindashboard", { replace: true });
        } else if (user?.role === "user") {
          navigate("/Userdashboard", { replace: true });
        } else {
          navigate("/Driversboard", { replace: true });
        }
      } else {
        alert("Invalid email or password!");
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/Admindashboard", { replace: true });
      } else if (user?.role === "user") {
        navigate("/Userdashboard", { replace: true });
      } else {
        navigate("/Driversboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">DirtMan</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-100 focus:border-gray-100 text-gray-900 p-2.5"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-100 focus:border-gray-100 text-gray-900 p-2.5 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <Icon
                  path={showPassword ? mdiEyeOff : mdiEye}
                  size={0.7}
                  color="gray"
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-nav text-white font-medium py-2 rounded-sm focus:outline-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
