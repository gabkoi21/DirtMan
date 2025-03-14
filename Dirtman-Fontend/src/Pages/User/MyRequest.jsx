import PickUpCalendar from "../../components/UserPickUpCalendar";

const UserManagementContainer = () => (
  <div className="flex">
    <aside className="md:w-[20%] lg:w-[23%] h-screen" />
    <main className="md:w-[98%] w-full mx-3 px-3 mt-24">
      <PickUpCalendar />
    </main>
  </div>
);

export default UserManagementContainer;
18;
