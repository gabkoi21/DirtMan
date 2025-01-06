import UserNav from "../components/UserNav";
const PickupSchedule = () => {
  return (
    <div className="flex">
      <aside className="w-[16%] h-screen bg-white shadow-lg">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4  mt-20">
        <p>Schedule a Pickup for your waste</p>
      </main>
    </div>
  );
};

export default PickupSchedule;
