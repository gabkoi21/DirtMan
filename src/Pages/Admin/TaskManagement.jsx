import { useState } from "react";
// import { AdminNav } from "../../Routes/AdminRoutes";
import { drivers, task, customers } from "../../data/TaskManagementData";

import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";

const TaskmanagementContainer = () => (
  <div className="flex">
    <aside className="md:w-[16%] h-screen">{/* <AdminNav /> */}</aside>
    <main className="md:w-[84%] w-full mx-3 px-3 mt-20">
      <TaskManagement />
    </main>
  </div>
);

const TaskManagement = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="md:flex flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Task Management
        </h1>
      </div>

      {/* Horizontal line for separation */}
      <hr className="border-t-2 my-4 border-r-emerald-700" />

      {/* Table Section */}
      <div className="relative mt-6 ">
        <table className="w-full text-sm text-left text-gray-500 rounded-lg">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-4">
                Costumer
              </th>
              <th scope="col" className="px-6 py-4">
                Contact number
              </th>
              <th scope="col" className="px-6 py-4">
                Location
              </th>
              <th scope="col" className="px-6 py-4">
                Waste Types
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <TaskManagementFetch />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TaskManagementFetch = () => {
  const [activeRow, setActiveRow] = useState(null);

  const handleShowUser = (index) => {
    setActiveRow((prevIndex) => (prevIndex === index ? null : index));
  };

  const TaskData = task;
  return (
    <>
      {TaskData.map((task, index) => (
        <TaskManagementRow
          key={index}
          tasksObj={task}
          isActive={activeRow === index}
          onShowUser={() => handleShowUser(index)}
        />
      ))}
    </>
  );
};

const TaskManagementRow = (props) => {
  const { address, type, status, customerContact } = props.tasksObj;
  const { isActive, onShowUser } = props;

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50 ">
        <td>
          <select
            className="border border-gray-300  px-1 py-1 text-gray-700  focus:outline-0 w-full rounded-md focus:ring-0 focus:ring-none focus:outline-none sm:text-base  "
            value={drivers.name}
          >
            {customers.map((customers) => (
              <option key={customers.id} value={customers.name}>
                {customers.name}
              </option>
            ))}
          </select>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {customerContact}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{address}</td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{type}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>
        </td>
        <td>
          <select
            className="border border-gray-300  px-1 py-1 text-gray-700  focus:outline-0 w-full rounded-md focus:ring-0 focus:ring-none focus:outline-none sm:text-base  "
            value={drivers.name}
          >
            {drivers.map((drivers) => (
              <option key={drivers.id} value={drivers.name}>
                {drivers.name}
              </option>
            ))}
          </select>
        </td>

        <td className="relative">
          <button onClick={onShowUser} className="rounded-full ">
            <Icon path={mdiDotsVertical} size={1} className="ml-10" />
          </button>

          {isActive && (
            <div className="absolute  md:right-24 -mt-10 w-40 bg-white border rounded shadow-lg">
              <button className="hover:bg-gray-100 px-3 py-1 cursor-pointer text-black capitalize">
                approved
              </button>
              <br />
              <button className="hover:bg-gray-100 px-3 py-1 cursor-pointer text-black capitalize">
                Delete
              </button>
              <button className="hover:bg-gray-100 px-3 py-1 cursor-pointer text-black capitalize">
                Edit
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default TaskmanagementContainer;
