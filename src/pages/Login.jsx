import UserNav from "../components/UserNav";

const Login = () => {
  <div className="flex">
    <aside className="w-[16%] h-screen bg-white shadow-lg">
      <UserNav />
    </aside>
    <main className="w-3/4 p-4">
      <p>This is the login Screen</p>
    </main>
  </div>;
};

export default Login;
