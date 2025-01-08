import UserNav from "../components/UserNav";

const Request = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%]  h-screen ">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4  mt-20">
        <p>This is the Request and i need on Bard </p>
      </main>
    </div>
  );
};

export default Request;
