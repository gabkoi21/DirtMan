import UserNav from "../components/UserNav";
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiFileDocument, mdiDotsHorizontal, mdiDotsVertical } from "@mdi/js";
import { requests } from "../data/RequestData";
import WastePickupForm from "../components/PickupForm";
// import { Button } from "flowbite-react";

const MyRequestContainer = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%] h-screen">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4 mt-20">
        <RequestHeader />
      </main>
    </div>
  );
};

const Modal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, onClose } = props;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent closing when clicking inside the modal (form)
  const handleFormClick = (e) => {
    e.stopPropagation(); // Prevent click from propagating to the backdrop
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20"
      onClick={handleBackdropClick}
    >
      <div
        className="rounded-lg p-6 relative w-[90%] max-w-[600px]"
        onClick={handleFormClick} // Prevent click inside the form from closing the modal
      >
        {children}
      </div>
    </div>
  );
};

const RequestHeader = () => {
  const [displayForm, setDisplayForm] = useState(false);

  const openForm = () => {
    setDisplayForm(true);
  };

  return (
    <>
      <button className="px-4 py-2  text-black rounded " onClick={openForm}>
        Schedule Pickup
      </button>

      {displayForm && (
        <Modal onClose={() => setDisplayForm(false)}>
          <WastePickupForm />
        </Modal>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 capitalize bg-gray-50">
            <tr>
              <th colSpan="5" className="p-3">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                    <Icon
                      path={mdiFileDocument}
                      size={1}
                      className="text-black"
                    />
                    <p className="text-xl font-bold text-black">
                      List of Previous Requests
                    </p>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <Request />
          <RequestTableHeaders />
        </table>
      </div>
    </>
  );
};

const Request = () => (
  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-white even:dark:bg-gray-800 border-b dark:border-gray-700">
    <td colSpan="5" className="px-6 py-4">
      <p className="text-base text-black">118 Requests</p>
    </td>
  </tr>
);

const RequestTableHeaders = () => (
  <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
      <tbody>
        <RequestFetch />
      </tbody>
    </table>
  </div>
);

const RequestFetch = () => (
  <>
    {requests.map((request) => (
      <RequestTable key={request.id} requestObj={request} />
    ))}
  </>
);

const RequestTable = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name, address, wasteType, time, status } = props.requestObj;

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {name}
        </th>
        <td className="px-6 py-4">{address}</td>
        <td className="px-6 py-4">{wasteType}</td>
        <td className="px-6 py-4">{time}</td>
        <td className="px-6 py-4">{status}</td>
        <button className="mt-3">
          <Icon
            className="ml-10 items-center text-green-950"
            path={mdiDotsVertical}
            size={1}
          />
        </button>
      </tr>
    </>
  );
};

export default MyRequestContainer;



const extraInformation = () =>{
  return(
    
  )
}
