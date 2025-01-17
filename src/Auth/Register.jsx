import { mdiEye } from "@mdi/js";
import Icon from "@mdi/react";

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">DirtMan</h2>
        </div>
        <form>
          <div className="mb-1">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-100 focus:border-gray-100 text-gray-900 p-2.5"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-100 focus:border-gray-100 text-gray-900 p-2.5"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-100 focus:border-gray-100 text-gray-900 p-2.5 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <Icon path={mdiEye} size={0.7} color="gray" />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-100 focus:border-gray-100 text-gray-900 p-2.5 pr-10"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <Icon path={mdiEye} size={0.7} color="gray" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-nav text-white font-medium py-2 rounded-sm focus:outline-none"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-nav font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
