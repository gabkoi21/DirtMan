import { useState } from "react";
import Icon from "@mdi/react";
import { mdiFilter } from "@mdi/js";
import { AssignedPickup } from "../../data/AssignedPickup";
import PickupScheduler from "../../components/UserPickUpCalendar";

const DriverManagementContainer = () => {
  const [selectedPickup, setSelectedPickup] = useState(null);

  return (
    <div className="flex">
      <aside className="md:w-[20%] lg:w-[23%] h-screen" />
      <main className="md:w-[98%] w-full mx-3 px-3 mt-20">
        <AssignedPickupHeader />
        <DetailSection
          selectedPickup={selectedPickup}
          setSelectedPickup={setSelectedPickup}
        />
      </main>
    </div>
  );
};

// eslint-disable-next-line
const DetailSection = ({ selectedPickup, setSelectedPickup }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between  gap-6 mt-4">
      <div className="w-full md:w-1/2 border shadow-lg p-4  rounded-md">
        <h2 className="text-xl font-bold  ">Today Pickups</h2>
        <span className="text-base text-gray-500">
          March 13, 2025 • {AssignedPickup.length} total pickups
        </span>
        {AssignedPickup.map((pickup) => (
          <PickupCard
            key={pickup.id}
            pickupObj={pickup}
            setSelectedPickup={setSelectedPickup}
          />
        ))}
      </div>
      <div className="w-full md:w-1/2 border shadow-lg p-4  rounded-md">
        <h2 className="text-xl font-bold mb-3 ">Pickup Details</h2>
        <PickupDetails pickupObj={selectedPickup} />
      </div>
    </div>
  );
};

function AssignedPickupHeader() {
  return (
    <div>
      <p className="text-3xl font-bold">Assigned Pickups</p>
      <span className="text-base ">
        View and manage your waste collection tasks
      </span>
      <div className="mt-10 flex justify-between gap-4 py-1">
        {/* Search Input */}
        <div className="w-[23%] py-1">
          <input
            type="text"
            placeholder="Search"
            className="border rounded w-full p-1 text-sm focus:outline-none focus:ring-0"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="w-[20%] flex items-center gap-2">
          <Icon path={mdiFilter} size={1} />
          <select className="bg-white border rounded w-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option className="bg-white text-black" value="all">
              All Pickups
            </option>
            <option className="bg-white text-black" value="pending">
              Pending
            </option>
            <option className="bg-white text-black" value="in-progress">
              In Progress
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
// eslint-disable-next-line
const PickupCard = ({ pickupObj, setSelectedPickup }) => {
  // eslint-disable-next-line
  const { address, wasteType, status, time, icon } = pickupObj;

  return (
    <div
      className="mt-4 p-4 border rounded-lg shadow-sm cursor-pointer  hover:bg-gray-100"
      onClick={() => setSelectedPickup(pickupObj)}
    >
      {/* Address */}
      <p className="font-semibold text-gray-800">{address}</p>

      {/* Waste Type & Status */}
      <div className="flex justify-between items-center mt-3">
        {/* Waste Type with Icon */}
        <div className="flex items-center gap-2">
          <Icon path={icon} size={0.8} />
          <p className="text-sm text-gray-600">{wasteType}</p>
        </div>

        {/* Status Badge */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            status === "Completed"
              ? "bg-green-500"
              : status === "In Progress"
              ? "bg-blue-500"
              : "bg-red-500"
          }`}
        >
          {status}
        </div>
      </div>

      {/* Time */}
      <p className="text-sm text-gray-500 mt-2">{time}</p>
    </div>
  );
};

// eslint-disable-next-line
const PickupDetails = ({ pickupObj }) => {
  if (!pickupObj) {
    return (
      <p className="text-gray-500 text-center mt-4">
        Select a pickup to see details
      </p>
    );
  }
  // eslint-disable-next-line
  const { address, wasteType, status, time } = pickupObj;

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="font-semibold text-lg text-gray-800">{address}</p>

        <div className="mt-6">
          {/* Waste Type and Status */}
          <div className="grid grid-cols-2 gap-4 border-b pb-2">
            <span className="text-gray-600 font-medium">Type</span>

            <p className="text-gray-700">{wasteType}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b py-2">
            <span className="text-gray-600 font-medium">Status</span>
            <p
              className={`${
                status === "Completed"
                  ? "text-green-600"
                  : status === "In Progress"
                  ? "text-blue-600"
                  : "text-red-500"
              } font-medium`}
            >
              {status}
            </p>
          </div>

          {/* Time Section */}
          <div className="mt-5">
            <span className="text-gray-600 font-medium">Time</span>
            <p className="text-gray-700 mt-1">{time}</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 ">
        <PickupScheduler />
      </div>
    </>
  );
};

export default DriverManagementContainer;
