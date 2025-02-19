import { create } from "zustand";
import { persist } from "zustand/middleware";

// Fake Admin & User Data
const FAKE_Admin = {
  name: "Jack",
  email: "Admin",
  password: "Admin",
  role: "admin",
};

const FAKE_USER = {
  name: "John",
  email: "User",
  password: "User",
  role: "user",
};

// Create Zustand Store
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Login function
      login: (email, password) => {
        let loggedInUser = null;

        if (email === FAKE_Admin.email && password === FAKE_Admin.password) {
          loggedInUser = FAKE_Admin;
        } else if (
          email === FAKE_USER.email &&
          password === FAKE_USER.password
        ) {
          loggedInUser = FAKE_USER;
        }

        if (loggedInUser) {
          set({ user: loggedInUser, isAuthenticated: true });
          return true;
        }

        return false;
      },

      // Logout function
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
