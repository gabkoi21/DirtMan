import UserNav from "../components/UserNav";

const Home = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%]  h-screen ">
        <UserNav />
      </aside>
      <main className="w-3/4 p-4">
        <p>This is the home page</p>
      </main>
    </div>
  );
};

export default Home;
