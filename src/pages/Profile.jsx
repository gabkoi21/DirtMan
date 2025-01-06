import UserNav from "../components/UserNav";

const Profile = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%]  h-screen ">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4  mt-20">
        <p>This is the Profile screen</p>
      </main>
    </div>
  );
};

export default Profile;
