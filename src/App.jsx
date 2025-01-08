import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PageNav from "./components/PageNav";
import RootNavForAdmin from "./AuthRoots/RootNavForAdmin";
import RootNavForUser from "./AuthRoots/RootNavForUser";

const App = () => {
  const isAdmin = true;

  return (
    <BrowserRouter>
      <PageNav />
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            isAdmin ? <RootNavForAdmin /> : <Navigate to="/user" replace />
          }
        />

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            !isAdmin ? <RootNavForUser /> : <Navigate to="/admin" replace />
          }
        />

        {/* Fallback Route */}
        <Route
          path="*"
          element={<Navigate to={isAdmin ? "/admin" : "/user"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
