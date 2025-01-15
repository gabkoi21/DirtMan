import UserNav from "../Navigations/UserNav";
import BottomNav from "../Navigations/UserNav";
import { User } from "../data/UserData";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import { useState } from "react";

// This is the root container that holds all the other components
const UserManagementContainer = () => (
  <div className="flex">
    <aside className="md:w-[16%] h-screen">
      <UserNav />
    </aside>
    <main className="md:w-[84%] w-full mx-1 px-3 mt-20">
      <UserManagement />
    </main>

    <BottomNav />
  </div>
);

// This component displays the header and list of requests
const UserManagement = () => {
  return (
    <>
      <div className="md:flex flex-row justify-between gap-5">
        <div>
          <h1 className="text-base md:text-3xl md:mx-3 lg:mx-2 2xl:mx-3 font-bold text-gray-800">
            User Management
          </h1>
        </div>
      </div>

      {/* Table Section */}
      <div className="relative overflow-x-auto sm:rounded-lg mt-10 max-w-18xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-20 py-3  ">
                Email
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Role
              </th>
              <th scope="col" className="py-3 px-10">
                Status
              </th>
              <th scope="col" className="px-6 py-3 ">
                Actions
              </th>
            </tr>
          </thead>
          <UserTableFetch />
        </table>
      </div>
    </>
  );
};

// Fetch and render the list of requests
const UserTableFetch = () => {
  const userData = User;
  return (
    <tbody>
      {userData.map((user) => (
        <RequestRow key={user.id} requestObj={user} />
      ))}
    </tbody>
  );
};

const RequestRow = (props) => {
  const { name, email, role, status } = props.requestObj;
  const [UserShow, setUserShown] = useState(false);

  function handleShowUser() {
    setUserShown((prev) => !prev);
  }

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50">
        <th className="md:px-6 md:py-3 md:whitespace-nowrap">{name}</th>
        <td className="md:px-6 md:py-3 px-5 whitespace-nowrap">{email}</td>
        <td className="md:px-6 md:py-3 px-10">{role}</td>
        <td className="md:px-6 md:py-3 px-5 whitespace-nowrap">{status}</td>
        <td className="relative">
          <button onClick={handleShowUser} className="rounded-full ">
            <Icon path={mdiDotsVertical} size={1} />
          </button>
          {UserShow && (
            <div className="absolute rounded shadow-md p-2 z-10">
              <button className="block px-8  py-1  text-black">
                Deactivate
              </button>
              <button className="block px-8 py-1 text-black ">Activate</button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserManagementContainer;
