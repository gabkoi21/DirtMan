import { useState } from "react";
import { service, drivers, assignedRequest } from "../../data/ServiceRequest";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

// Reusable Table Header Component
const TableHeader = () => (
  <tr>
    <th scope="col" className="px-6 py-4">
      Customer
    </th>
    <th scope="col" className="px-6 py-4">
      Address
    </th>
    <th scope="col" className="px-6 py-4">
      Date
    </th>
    <th scope="col" className="px-6 py-4">
      Time
    </th>
    <th scope="col" className="px-6 py-4">
      Status
    </th>
    <th scope="col" className="px-6 py-4">
      Driver
    </th>
  </tr>
);

// Status Badge Component
const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      status === "Completed"
        ? "bg-black text-white"
        : status === "Scheduled"
        ? "bg-white text-black"
        : status === "Inprogress"
        ? "bg-white text-black"
        : status === "Cancelled"
        ? "bg-red-600 text-white"
        : "bg-gray-400 text-white"
    }`}
  >
    {status}
  </span>
);

// Search Form Component
const SearchRequestForm = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon path={mdiMagnify} size={1} />
      </div>
      <input
        type="search"
        className="block w-[30%] px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search for requests..."
        required
      />
    </div>
  );
};

// Service Request Row Component
const ServiceRequestRow = ({ serviceObj }) => {
  const { customer, location, types, requestDate, status, driver } = serviceObj;

  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{customer}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{location}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{types}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        {requestDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{driver}</td>
    </tr>
  );
};

// Assigned Request Row Component
const AssignedRequestRow = ({ assignedRequestObj }) => {
  const { customer, location, types, requestDate, status } = assignedRequestObj;

  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{customer}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{location}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{types}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        {requestDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-green-500 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select Driver
          </option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

// Table Component
const RequestTable = ({ activeTab }) => (
  <table className="w-full text-sm text-left text-gray-500 rounded-lg">
    <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
      <TableHeader />
    </thead>
    <tbody>
      {activeTab === "all"
        ? service.map((item) => (
            <ServiceRequestRow key={item.id} serviceObj={item} />
          ))
        : assignedRequest.map((item) => (
            <AssignedRequestRow key={item.id} assignedRequestObj={item} />
          ))}
    </tbody>
  </table>
);

// Main Service Request Component
const ServiceRequest = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <div className="md:flex flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          RequestManagement
        </h1>
      </div>

      <hr className="border-t-2 my-4 border-r-emerald-700" />

      <SearchRequestForm />

      <div>
        <div className="flex gap-5 mt-4 ml-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 border rounded-md ${
              activeTab === "all"
                ? "bg-gray-300 text-black"
                : "bg-white text-gray-700"
            } hover:bg-gray-100`}
          >
            All Requests
          </button>
          <button
            onClick={() => setActiveTab("assigned")}
            className={`px-3 py-1 border rounded-md ${
              activeTab === "assigned"
                ? "bg-gray-300 text-black"
                : "bg-white text-gray-700"
            } hover:bg-gray-100`}
          >
            Assigned Drivers
          </button>
        </div>

        <div className="relative mt-6">
          <RequestTable activeTab={activeTab} />
        </div>
      </div>
    </>
  );
};

// Main Container Component
const ServiceRequestContainer = () => (
  <div className="flex">
    <aside className="md:w-[20%] lg:w-[23%] h-screen" />
    <main className="md:w-[98%] w-full mx-3 px-3 mt-20">
      <ServiceRequest />
    </main>
  </div>
);

export default ServiceRequestContainer;
