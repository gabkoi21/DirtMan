import { User } from "../../data/UserData";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import { useState } from "react";
// import { AdminNav } from "../../Routes/AdminRoutes";

// This is the root container that holds all the other components
const UserManagementContainer = () => (
  <div className="flex">
    <aside className="md:w-[16%] h-screen">{/* <AdminNav /> */}</aside>
    <main className="md:w-[84%] w-full mx-3 px-3 mt-20">
      <UserManagement />
    </main>
  </div>
);

// This component displays the header and list of requests
const UserManagement = () => {
  return (
    <>
      <div className="md:flex flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          User Management
        </h1>
      </div>

      {/* Horizontal line for separation */}
      <hr className="border-t-2 my-4 border-r-emerald-700" />

      {/* Table Section */}
      <div className="relative mt-6 overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rounded-lg">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th scope="col" className="px-6 py-4">
                Email
              </th>
              <th scope="col" className="px-6 py-4">
                Role
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
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

// Fetch and render the list of users
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

// RequestRow Component for displaying individual rows
const RequestRow = ({ isActive, onShowUser, requestObj }) => {
  const { name, email, role, status } = requestObj;

  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{role}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="relative">
        <button onClick={onShowUser} className="rounded-full">
          <Icon path={mdiDotsVertical} size={1} className="ml-7" />
        </button>

        {isActive && (
          <div className="absolute md:right-32 -mt-10 w-40 bg-white border border-gray-50 rounded shadow-lg">
            <button className="hover:bg-gray-100 px-3 py-1 cursor-pointer text-black capitalize">
              Deactivate
            </button>
            <button className="hover:bg-gray-100 px-3 py-1 cursor-pointer text-black capitalize">
              Activate
            </button>
            <button className="hover:bg-gray-100 px-3 py-1 cursor-pointer text-black capitalize">
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserManagementContainer;
