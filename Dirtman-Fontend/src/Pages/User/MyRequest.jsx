import { useState } from "react";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import { requests } from "../../data/RequestData";
import UserNav from "../../routes/UserRoutes";
import WastePickupForm from "../../components/PickupForm";

// This is the root container that holds all the other components
const MyRequestContainer = () => (
  <div className="flex justify-between gap-1">
    <aside className="md:w-[16%] h-screen">
      <UserNav />
    </aside>
    <main className="md:w-[84%] w-full mx-3 px-3 mt-20">
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
      <div className="md:flex flex-row justify-between gap-5">
        <div>
          <h1 className="text-base md:text-3xl md:mx-3 lg:mx-2 2xl:mx-3 font-bold text-gray-800">
            My Waste Pickup Requests
          </h1>
        </div>
        <div className="mt-2">
          <button
            className="text-white py-1 px-1 rounded-sm font-medium bg-green-950 whitespace-normal w-32"
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

      {/* Horizontal line for separation */}
      <hr className="border-t-2 my-4 border-r-emerald-700" />
      {/* Table Section */}
      <div className="relative overflow-x-auto sm:rounded-lg mt-10 max-w-18xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-20 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Waste Type
              </th>
              <th scope="col" className="py-3 px-10">
                Date/Time
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
  const { name, address, wasteType, time, status, date } = props.requestObj;
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b">
      <td className="md:px-6 md:py-3 md:whitespace-nowrap ">{name}</td>
      <td className="md:px-6 md:py-3 px-5 whitespace-nowrap">{address}</td>
      <td className="md:px-6 md:py-3 px-10">{wasteType}</td>
      <td className="md:px-6 md:py-3 px-5 whitespace-nowrap">
        {date} {time}
      </td>
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
      <td className="relative px-6">
        <button onClick={() => setShowExtraInfo(!showExtraInfo)}>
          <Icon path={mdiDotsVertical} size={1} className="text-gray-500" />
        </button>
        {showExtraInfo && (
          <div className="absolute right-28 -mt-10 w-40 bg-white border rounded shadow-lg">
            <button className="hover:bg-gray-100 px-4 py-1 cursor-pointer text-black">
              Delete
            </button>
            <br />
            <button className="hover:bg-gray-100 px-4 py-1 cursor-pointer text-black">
              Edit
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default MyRequestContainer;
