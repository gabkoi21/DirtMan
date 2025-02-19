import { useState } from "react";
import { service, drivers, assignedRequest } from "../../data/ServiceRequest";
import Icon from "@mdi/react";
import { mdiDotsVertical, mdiMagnify } from "@mdi/js";

const ServiceRequestContainer = () => (
  <div className="flex">
    <aside className="md:w-[20%] h-screen">{/* <AdminNav /> */}</aside>
    <main className="md:w-[98%] w-full mx-3 px-3 mt-20">
      <ServiceRequest />
    </main>
  </div>
);

const ServiceRequest = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <SearchRequestForm />
      <div>
        {/* Tab Buttons */}
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

        {/* Table Rendering */}
        <div className="relative mt-6">
          {activeTab === "all" ? (
            <table className="w-full text-sm text-left text-gray-500 rounded-lg">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
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
              </thead>
              <tbody>
                <ServiceRequestFetch />
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 rounded-lg">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
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
              </thead>
              <tbody>
                <AssignedRequestFetch />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

const ServiceRequestFetch = () => {
  const serviceData = service;
  return (
    <>
      {serviceData.map((service) => (
        <ServiceRequestRow serviceObj={service} key={service.id} />
      ))}
    </>
  );
};

const ServiceRequestRow = (props) => {
  const { customer, location, types, requestDate, status, driver } =
    props.serviceObj;

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {customer}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {location}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{types}</td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {requestDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === "Completed"
                ? "bg-black text-white" // Green for Completed
                : status === "Scheduled"
                ? "bg-white text-black" // Yellow for Pending
                : status === "Inprogress"
                ? "bg-white text-black" // Blue for Approved
                : status === "Cancelled"
                ? "bg-red-600 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{driver}</td>
      </tr>
    </>
  );
};

const AssignedRequestFetch = () => {
  const assignedRequestdata = assignedRequest;
  return (
    // Add return statement here
    <>
      {assignedRequestdata.map((assignedRequest) => (
        <AssignedRequestRow
          assignedRequestObj={assignedRequest}
          key={assignedRequest.id}
        />
      ))}
    </>
  );
};

const AssignedRequestRow = ({ assignedRequestObj }) => {
  const { customer, location, types, requestDate, status } = assignedRequestObj;

  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {customer}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {location}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{types}</td>

        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {requestDate}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === "Completed"
                ? "bg-black text-white" // Green for Completed
                : status === "Scheduled"
                ? "bg-white text-black" // Yellow for Pending
                : status === "Inprogress"
                ? "bg-white text-black" // Blue for Approved
                : status === "Cancelled"
                ? "bg-red-600 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {status}
          </span>
        </td>

        {/* <td className="px-6 py-4 whitespace-nowrap text-gray-900">{drivers}</td> */}

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
      </tr>
    </>
  );
};

export default ServiceRequestContainer;

// This is serch form
const SearchRequestForm = () => {
  return (
    <form className="mt-6 flex items-center space-x-2">
      <input
        name="query"
        placeholder="Search request ..."
        className="border py-1 px-3 rounded-l-md w-[25%]"
      />
      <button
        type="submit"
        className="bg-green-950 text-white p-1 rounded-r-md flex items-center justify-center hover:bg-green-950-600"
      >
        <Icon path={mdiMagnify} size={1} />
      </button>
    </form>
  );
};
