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
  const [activeRow, setActiveRow] = useState(null);

  const handleShowUser = (index) => {
    setActiveRow((prevIndex) => (prevIndex === index ? null : index));
  };

  const userData = User; // Assuming User is your data array
  return (
    <tbody>
      {userData.map((user, index) => (
        <RequestRow
          key={user.id}
          requestObj={user}
          isActive={activeRow === index}
          onShowUser={() => handleShowUser(index)}
        />
      ))}
    </tbody>
  );
};

// eslint-disable-next-line react/prop-types
const RequestRow = ({ isActive, onShowUser, requestObj }) => {
  // eslint-disable-next-line react/prop-types
  const { name, email, role, status } = requestObj;

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50">
        <th className="md:px-6 md:py-3 md:whitespace-nowrap">{name}</th>
        <td className="md:px-6 md:py-3 px-5 whitespace-nowrap">{email}</td>
        <td className="md:px-6 md:py-3 px-10">{role}</td>
        <td className="md:px-6 md:py-3 px-5 whitespace-nowrap">{status}</td>
        <td className="relative">
          <button onClick={onShowUser} className="rounded-full ">
            <Icon path={mdiDotsVertical} size={1} className="ml-7" />
          </button>

          {isActive && (
            <div className="absolute right-28 -mt-10 w-40 bg-white border rounded shadow-lg">
              <button className="hover:bg-gray-100 px-4 py-1 cursor-pointer text-black">
                Deactivate
              </button>{" "}
              <br />
              <button className="hover:bg-gray-100 px-4 py-1 cursor-pointer text-black">
                Activate
              </button>
              <button className="hover:bg-gray-100 px-4 py-1 cursor-pointer text-black">
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserManagementContainer;
