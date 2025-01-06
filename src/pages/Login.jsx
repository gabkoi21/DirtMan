import UserNav from "../components/UserNav";

const Login = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%]  h-screen ">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4  mt-20">
        <p>Logout....</p>
      </main>
    </div>
  );
};

export default Login;
