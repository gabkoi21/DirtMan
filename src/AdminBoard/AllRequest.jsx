import UserNav from "../components/UserNav";
import Icon from "@mdi/react";
import { mdiFileDocument, mdiDotsHorizontal } from "@mdi/js";
// import { requests } from "../data/RequestData";
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
                <div className="bg-white rounded-full p-1">
                  <Icon
                    path={mdiDotsHorizontal}
                    size={1}
                    className=" text-black"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <Request />
        <RequestTableHeaders />
      </table>
    </div>
  );
};

const Request = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-white even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td colSpan="5" className="px-6 py-4">
        <p className="text-base text-black">118 Requests</p>
      </td>
    </tr>
  );
};

const RequestTableHeaders = () => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
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
          </tr>
        </thead>
        <tbody>
          <RequestFetch />
        </tbody>
      </table>
    </div>
  );
};

const RequestFetch = () => {
  const wasteRequestData = Allrequests;
  return (
    <>
      {wasteRequestData.map((request) => (
        <RequestTable key={request.id} requestObj={request} />
      ))}
    </>
  );
};

// Request Table Row Component
const RequestTable = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name, address, wasteType, time, status, email } = props.requestObj;

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{address}</td>
      <td className="px-6 py-4">{wasteType}</td>
      <td className="px-6 py-4">{time}</td>
      <td className="px-6 py-4">{status}</td>
    </tr>
  );
};

export default AllRequestContainer;
