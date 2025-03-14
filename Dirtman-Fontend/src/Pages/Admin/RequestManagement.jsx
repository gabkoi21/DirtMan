import { useState } from "react";
import { requests } from "../../data/ServiceRequest";
import Icon from "@mdi/react";
import { drivers } from "../../data/TaskManagementData";
import { mdiMagnify, mdiDotsHorizontal, mdiDelete, mdiClose } from "@mdi/js";
import PickupScheduler from "../../components/UserPickUpCalendar";

// Main Container Component
const ServiceRequestContainer = () => (
  <div className="flex">
    <aside className="md:w-[20%] lg:w-[23%] h-screen" />
    <main className="md:w-[98%] w-full mx-3 px-3 mt-20">
      <WasteRequest />
    </main>
  </div>
);

const WasteRequest = () => {
  const [activeTab] = useState("all");
  const [activeUser, setActiveUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to show calendar for a specific user
  const showCalendar = (user) => {
    setActiveUser(user); // Set the active user to show their calendar
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveUser(null);
  };

  return (
    <>
      <div className="items-center mb-6">
        <h1 className="text-xl md:text-3xl mt-3 font-bold text-gray-800">
          Waste Collection Requests
        </h1>
        <p className="text-base mt-2">View and manage Scheduled waste</p>
      </div>

      <hr className="border-t-2 my-4 border-r-emerald-700" />
      <SearchRequestForm />
      <div className="relative mt-6">
        <WasteRequestTable activeTab={activeTab} showCalendar={showCalendar} />
      </div>

      {/* Modal for displaying the calendar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 relative">
            <button
              className="absolute top-2 right-2 p-2 text-gray-600"
              onClick={closeModal}
            >
              <Icon path={mdiClose} size={1} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {activeUser.customer}'s Calendar
            </h2>
            <PickupScheduler user={activeUser} />
          </div>
        </div>
      )}
    </>
  );
};

// Search Form Component this is a reusable component
const SearchRequestForm = () => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Icon path={mdiMagnify} size={1} />
    </div>
    <input
      type="search"
      className="block w-[30%] px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search for requests..."
    />
  </div>
);

// eslint-disable-next-line
const StatusBadge = ({ status }) => {
  const statusClasses = {
    Completed: "bg-black text-white",
    Scheduled: "bg-white text-black",
    Inprogress: "bg-white text-black",
    Cancelled: "bg-red-600 text-white",
    Default: "bg-gray-400 text-white",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusClasses[status] || statusClasses.Default
      }`}
    >
      {status}
    </span>
  );
};

// eslint-disable-next-line
const WasteRequestRow = ({ requestsObj, showCalendar }) => {
  // eslint-disable-next-line
  const { customer, location, types, requestDate, status, requestTime } =
    requestsObj;

  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{customer}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{location}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        {`${requestDate} at ${requestTime}`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        <td>
          <select
            className="border border-gray-300  px-5 py-0 text-gray-700  focus:outline-0 w-full rounded-md focus:ring-0 focus:ring-none focus:outline-none sm:text-base  "
            value={drivers.name}
          >
            {drivers.map((drivers) => (
              <option key={drivers.id} value={drivers.name}>
                {drivers.name}
              </option>
            ))}
          </select>
        </td>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        <span className="flex flex-row space-x-2">
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            title="More options"
          >
            <Icon
              path={mdiDotsHorizontal}
              size={0.7}
              className="text-gray-600 hover:text-gray-800"
            />
          </button>
          <button
            className="p-1 hover:bg-green-50 rounded-full transition-colors duration-200"
            title="View Calendar"
            onClick={() => showCalendar(requestsObj)} // Pass the request to showCalendar
          >
            <Icon
              path={mdiMagnify}
              size={0.7}
              className="text-green-500 hover:text-green-600"
            />
          </button>
          <button
            className="p-1 hover:bg-red-50 rounded-full transition-colors duration-200"
            title="Delete request"
          >
            <Icon
              path={mdiDelete}
              size={0.7}
              className="text-red-500 hover:text-red-600"
            />
          </button>
        </span>
      </td>
    </tr>
  );
};

// Table Component this is a reusable component
const WasteRequestTable = ({ showCalendar }) => (
  <table className="w-full text-sm text-left mb-5 text-gray-500 rounded-lg">
    <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
      <TableHeader />
    </thead>
    <tbody>
      {requests.map((item) => (
        <WasteRequestRow
          key={item.id}
          requestsObj={item}
          showCalendar={showCalendar}
        />
      ))}
    </tbody>
  </table>
);

// Reusable Table Header Component this is a reusable component
const TableHeader = () => (
  <tr className="border-b border-gray-200 text-center">
    {["Customer", "Address", "Date & Time", "Driver", "Status", "Action"].map(
      (header) => (
        <th key={header} scope="col" className="px-6 py-4">
          {header}
        </th>
      )
    )}
  </tr>
);

export default ServiceRequestContainer;
