import UserNav from "../components/UserNav";
import Icon from "@mdi/react";
import { mdiBell, mdiDotsHorizontal, mdiDelete } from "@mdi/js";

const NotificationContainer = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%] h-screen">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4 mt-20 ">
        <NotificationTabale />
      </main>
    </div>
  );
};

const NotificationTabale = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th colSpan="5" className="p-3">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <Icon path={mdiBell} size={1} className=" text-black" />
                  <p className="text-xl font-bold text-black">
                    List Notification
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

        <div className="mx-5 mt-5 mb-5">
          <p className="text-base  text-black">118 Notification</p>
        </div>

        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"></tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <div>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Your waste will be collected by 2:30 PM. Please ensure it is
                properly placed for collection
              </th>
              <th className="text-sm text-black">Just Now</th>
            </div>
            <th className="text-sm ">
              <Icon path={mdiDelete} size={1} className="text-red-700" />
            </th>
          </tr>
        </tbody>

        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"></tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <div>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Your waste will be collected by 2:30 PM. Please ensure it is
                properly placed for collection
              </th>
              <th className="text-sm text-black">Just Now</th>
            </div>
            <th className="text-sm ">
              <Icon path={mdiDelete} size={1} className="text-red-700" />
            </th>
          </tr>
        </tbody>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"></tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <div>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Your waste will be collected by 2:30 PM. Please ensure it is
                properly placed for collection
              </th>
              <th className="text-sm text-black">Just Now</th>
            </div>
            <th className="text-sm ">
              <Icon path={mdiDelete} size={1} className="text-red-700" />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotificationContainer;
