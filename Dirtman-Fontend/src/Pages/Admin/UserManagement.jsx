import { User } from "../../data/UserData";
import Icon from "@mdi/react";
import { mdiDotsVertical, mdiClose, mdiPlus } from "@mdi/js";
import { useState } from "react";
import PickupScheduler from "../../components/UserPickUpCalendar";

// This is the root container that holds all the other components
const UserManagementContainer = () => (
  <div className="flex">
    <aside className="md:w-[20%] lg:w-[23%] h-screen" />
    <main className="md:w-[98%] w-full mx-3 px-3 mt-20">
      <UserManagement />
    </main>
  </div>
);

// This component displays the header and list of requests
const UserManagement = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  // Toggle the state for showing the add user form
  const toggleAddUserForm = () => {
    setShowAddUserForm((prev) => !prev);
  };

  const closeModal = () => {
    setShowAddUserForm(false);
  };

  return (
    <>
      <div className="md:flex flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            User Management
          </h1>
          <span>View, Edit, and Manage Users</span>
        </div>

        <div className="border py-2 px-6 rounded-md bg-green-950">
          <div className="flex gap-2 text-white">
            <span>
              <Icon path={mdiPlus} size={1} />
            </span>
            <button
              onClick={toggleAddUserForm} // Use the new function name here
              className="text-white capitalize font-semibold"
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal line for separation */}
      <hr className="border-t-2 my-4 border-r-emerald-700" />

      {/* Table Section */}
      <div className="relative mt-6 overflow-x-auto ">
        <div className="flex items-center mb-5">
          <input
            type="text"
            placeholder="Search..."
            className="px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-none"
          />
          <button className="ml-2 px-5 py-2 bg-green-950 text-white rounded-lg ">
            Search
          </button>
        </div>

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

        {/* Modal */}
        {showAddUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <FeedbackForm onClose={closeModal} />
          </div>
        )}
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

  const userData = User;
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
const RequestRow = ({ isActive, onShowUser, requestObj, handleShowUser }) => {
  const { name, email, role, status } = requestObj;

  return (
    <tr className="odd:bg-white even:bg-gray-50" onClick={onShowUser}>
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
        <button onClick={handleShowUser} className="rounded-full">
          <Icon path={mdiDotsVertical} size={1} className="ml-7" />
        </button>

        {isActive && (
          <div className="absolute md:right-32 -mt-10 w-32 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <button className="w-full px-4 py-2 text-start text-yellow-600 font-medium hover:bg-yellow-100 hover:text-yellow-700 mt-5 transition-all duration-200 ease-in-out active:scale-95">
              Edit user
            </button>
            <button className="w-full px-4 py-2 text-start text-green-600 font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200 ease-in-out active:scale-95">
              Change role
            </button>
            <button className="w-full text-start px-4 py-2 text-red-600 font-medium hover:bg-red-100 hover:text-red-700 transition-all duration-200 ease-in-out active:scale-95 border-t border-gray-200">
              Delete user
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserManagementContainer;

const FeedbackForm = ({ onClose }) => {
  return (
    <div className="w-[30%] bg-white shadow-md rounded-md p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black mb-4">Add New User</h2>
        <button onClick={onClose}>
          <Icon className="-mt-4" path={mdiClose} size={1} />
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="first-name"
            className=" block text-gray-600  font-medium mb-1"
          >
            First Name:
          </label>
          <input
            type="text"
            id="first-name"
            required
            value=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-0"
          />
        </div>

        <div>
          <label
            htmlFor="last-name"
            className=" block text-gray-600 font-medium mb-1"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="last-name"
            required
            value=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="role" className=" text-gray-600 font-medium mb-1">
            Role:
          </label>
          <select
            id="role"
            required
            value=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-0"
          >
            <option value="">Select Role</option>
            <option value="driver">Driver</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-950 text-white font-semibold py-2 rounded-md hover:bg-green-950 transition duration-300"
        >
          Create User
        </button>
      </form>
    </div>
  );
};
