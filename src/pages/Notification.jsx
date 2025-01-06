import UserNav from "../components/UserNav";
const Notification = () => {
  return (
    <div className="flex">
      <aside className="w-[16%] h-screen bg-white shadow-lg">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4  mt-20">
        <p>This is the Notification </p>
      </main>
    </div>
  );
};

export default Notification;
