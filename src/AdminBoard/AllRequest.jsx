import UserNav from "../components/UserNav";
import Icon from "@mdi/react";
import { mdiFileDocument, mdiDotsHorizontal, mdiDelete } from "@mdi/js";
import { Allrequests } from "../data/RequestData";

// Main Container Component
const AllRequestContainer = () => {
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

const RequestHeader = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 capitalize bg-gray-50 dark:bg-gray-800">
          <tr>
            <th colSpan="7" className="p-3">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Icon
                    path={mdiFileDocument}
                    size={1}
                    className="text-black"
                  />
                  <p className="text-xl font-bold text-black">
                    List of Requests
                  </p>
                </div>
                <div className="bg-white rounded-full p-1">
                  <Icon
                    path={mdiDotsHorizontal}
                    size={1}
                    className="text-black"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <Request />
        <RequestTableHeaders />
        <RequestFetch />
      </table>
    </div>
  );
};

const Request = () => {
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 dark:bg-gray-900">
      <td colSpan="7" className="px-6 py-4">
        <p className="text-base text-black">118 Requests</p>
      </td>
    </tr>
  );
};

const RequestTableHeaders = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-10 py-3">
          Name
        </th>
        <th scope="col" className="px-10 py-3">
          Email
        </th>
        <th scope="col" className="px-10 py-3">
          Address
        </th>
        <th scope="col" className="px-4 py-3 whitespace-nowrap">
          Waste Type
        </th>
        <th scope="col" className="px-8 py-3">
          Time
        </th>
        <th scope="col" className="px-4 py-3">
          Status
        </th>
        <th scope="col" className="px-4 py-3">
          Actions
        </th>
      </tr>
    </thead>
  );
};

const RequestFetch = () => {
  const wasteRequestData = Allrequests;
  return (
    <tbody>
      {wasteRequestData.map((request) => (
        <RequestTable key={request.id} requestObj={request} />
      ))}
    </tbody>
  );
};

// Request Table Row Component
const RequestTable = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name, address, wasteType, time, status, email } = props.requestObj;

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 dark:bg-gray-900">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{address}</td>
      <td className="px-6 py-4">{wasteType}</td>
      <td className="px-6 py-4">{time}</td>
      <td className="px-6 py-4">{status}</td>
      <td className="px-6 py-4">
        <button className="flex items-center justify-center text-red-700 ml-3">
          <Icon path={mdiDelete} size={1} />
        </button>
      </td>
    </tr>
  );
};

export default AllRequestContainer;
