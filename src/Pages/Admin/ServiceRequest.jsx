import { useState } from "react";
import { service } from "../../data/ServiceRequest";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
// import { AdminNav } from "../../Routes/AdminRoutes";

const ServiceRequestContainer = () => (
  <div className="flex">
    <aside className="md:w-[16%] h-screen">{/* <AdminNav /> */}</aside>
    <main className="md:w-[84%] w-full mx-3 px-3 mt-20">
      <ServiceRequest />
    </main>
  </div>
);

const ServiceRequest = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="md:flex flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Service Request
        </h1>
      </div>

      {/* Horizontal line for separation */}
      <hr className="border-t-2 my-4 border-r-emerald-700" />

      <div className="relative mt-6 ">
        <table className="w-full text-sm text-left text-gray-500 rounded-lg">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-4">
                Customer
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
                Request Date
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <ServiceRequestFetch />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ServiceRequestFetch = () => {
  const [activeRow, setActiveRow] = useState(null);
  const ServiceData = service;
  const handleShowUser = (index) => {
    setActiveRow((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <>
      {ServiceData.map((service, index) => (
        <ServiceRequestRow
          key={service.id}
          serviceObj={service}
          isActive={activeRow === index}
          onShowUser={() => handleShowUser(index)}
        />
      ))}
    </>
  );
};

const ServiceRequestRow = (props) => {
  const { customer, location, types, requestDate, status } = props.serviceObj;
  const { isActive, onShowUser } = props;

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
        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
          {requestDate}
        </td>
        <td className="relative">
          <button onClick={onShowUser} className="rounded-full">
            <Icon path={mdiDotsVertical} size={1} className="ml-10" />
          </button>

          {isActive && (
            <div className="absolute  md:right-24 -mt-10 w-40 bg-white border rounded shadow-lg">
              <button className="hover:bg-gray-100 px-3 py-3 cursor-pointer text-black capitalize">
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default ServiceRequestContainer;
