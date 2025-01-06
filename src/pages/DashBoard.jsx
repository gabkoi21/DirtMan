import UserNav from "../components/UserNav";
const Contact = () => {
  return (
    <div className="flex">
      <aside className="w-[16%] h-screen bg-white shadow-lg">
        <UserNav />
      </aside>
      <main className="w-3/4 p-4">
        <p>This is the Dash bard </p>
      </main>
    </div>
  );
};

export default Contact;
