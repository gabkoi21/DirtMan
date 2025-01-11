import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import { requests } from "../data/RequestData";
import UserNav from "../components/UserNav";
import WastePickupForm from "../components/PickupForm";

// This is the root container that holds all the other components
const MyRequestContainer = () => (
  <div className="flex">
    <aside className="md:w-[16%] h-screen">
      <UserNav />
    </aside>
    <main className="w-[84%] p-4 mt-20">
      <RequestHeader />
    </main>
  </div>
);

const Modal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, onClose } = props;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20"
      onClick={handleBackdropClick}
    >
      <div
        className="rounded-lg p-6 relative w-[90%] max-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// This component displays the header and list of requests
const RequestHeader = () => {
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Waste Pickup Requests
          </h1>
          <p className="text-gray-600">
            View, schedule, and manage your waste pickup requests conveniently.
          </p>
        </div>
        <div className="mt-2">
          <button
            className="bg-black text-white py-2 px-4 rounded-lg text-sm font-medium "
            onClick={() => setDisplayForm(true)}
          >
            Schedule Pickup
          </button>

          {displayForm && (
            <Modal onClose={() => setDisplayForm(false)}>
              <WastePickupForm />
            </Modal>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Waste Type
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <RequestTableFetch />
        </table>
      </div>
    </>
  );
};

// Fetch and render the list of requests
const RequestTableFetch = () => (
  <tbody>
    {requests.map((request) => (
      <RequestRow key={request.id} requestObj={request} />
    ))}
  </tbody>
);

// A single row in the requests table
const RequestRow = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name, address, wasteType, time, status } = props.requestObj;
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <th className="px-6 py-4">{name}</th>
      <td className="px-6 py-4">{address}</td>
      <td className="px-6 py-4">{wasteType}</td>
      <td className="px-6 py-4">{time}</td>
      <td className="px-6 py-4">{status}</td>
      <td className="relative px-6">
        <button
          className="mt-3"
          onClick={() => setShowExtraInfo(!showExtraInfo)}
        >
          <Icon path={mdiDotsVertical} size={1} className="text-gray-500" />
        </button>

        {showExtraInfo && (
          <div className="absolute right-2 mt-2 w-40 bg-white border rounded shadow-lg">
            <p className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
              Delete Pickup
            </p>
            <p className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
              Edit Pickup
            </p>
          </div>
        )}
      </td>
    </tr>
  );
};

export default MyRequestContainer;
