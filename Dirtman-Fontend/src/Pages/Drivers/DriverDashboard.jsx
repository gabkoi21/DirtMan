const DriverManagementContainer = () => (
  <div className="flex">
    <aside className="md:w-[20%] lg:w-[23%] h-screen" />
    <main className="md:w-[98%] w-full mx-3 px-3 mt-20">
      <Dashboard />
    </main>
  </div>
);

function Dashboard() {
  return <div>This is Driver Dashbord the</div>;
}

export default DriverManagementContainer;
