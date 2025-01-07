import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNav from "./components/PageNav";
import RootNavForAdmin from "./AuthRoots/RootNavForAdmin";
import RootNavForUser from "./AuthRoots/RootNavForUser";

const isAdmin = true; // Replace with actual authentication logic

const App = () => {
  return (
    <BrowserRouter>
      <PageNav />
      <Routes>
        {/* Conditionally render admin or user routes */}
        {isAdmin ? (
          <Route path="/*" element={<RootNavForAdmin />} />
        ) : (
          <Route path="/*" element={<RootNavForUser />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
