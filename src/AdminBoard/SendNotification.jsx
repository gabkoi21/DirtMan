import UserNav from "../components/UserNav";

const SendNotification = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%]  h-screen ">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4  mt-20">
        <p>Send Nification </p>
      </main>
    </div>
  );
};

export default SendNotification;
