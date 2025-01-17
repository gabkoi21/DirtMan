import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import PageNav from "./Navigations/PageNav";
import RootNavForAdmin from "./AuthRoots/RootNavForAdmin";
import RootNavForUser from "./AuthRoots/RootNavForUser";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

// const App = () => {
//   const isAdmin = true; // Replace with dynamic logic for determining admin or user.

//   return (
//     <BrowserRouter>
//       {/* PageNav will always be displayed */}
//       <PageNav />

//       {/* Define routes */}
//       <Routes>
//         {/* Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             isAdmin ? <RootNavForAdmin /> : <Navigate to="/user" replace />
//           }
//         />

//         {/* User Routes */}
//         <Route
//           path="/user/*"
//           element={
//             !isAdmin ? <RootNavForUser /> : <Navigate to="/admin" replace />
//           }
//         />

//         {/* Fallback Route */}
//         <Route
//           path="*"
//           element={<Navigate to={isAdmin ? "/admin" : "/user"} replace />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (username, password) => {
    // Replace with your actual login logic
    if (username === "admin" && password === "admin") {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else if (username === "user" && password === "user") {
      setIsAdmin(false);
      setIsLoggedIn(true);
    }
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          {/* PageNav will always be displayed */}
          <PageNav />

          {/* Define routes */}
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
        </>
      ) : (
        <Login onLogin={handleLogin} />
        // <Register onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
};

export default App;
