import UserNav from "../components/UserNav";
import Icon from "@mdi/react";
import { mdiBell, mdiDotsHorizontal, mdiDelete } from "@mdi/js";

import { notifations } from "../NotificationData";

const NotificationContainer = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%] h-screen">
        <UserNav />
      </aside>
      <main className="w-[84%] p-4 mt-20">
        <NotificationTable />
      </main>
    </div>
  );
};

const NotificationTable = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 capitalize bg-gray-50 ">
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
        <tbody>
          <>
            <Notifications />
            <NotificationFetch />
          </>
        </tbody>
      </table>
    </div>
  );
};

const NotificationFetch = () => {
  const notificationData = notifations;
  return (
    <>
      <tbody></tbody>
      {notificationData.map((notification) => (
        <NotificationTableRow
          key={notification.id}
          notificationObj={notification}
        />
      ))}
    </>
  );
};

const Notifications = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td colSpan="5" className="px-6 py-4">
        <p className="text-base text-black">118 Notifications</p>
      </td>
    </tr>
  );
};

const NotificationTableRow = ({ notificationObj }) => {
  const { message, timestamp, icon, iconClass } = notificationObj;

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {message}
      </td>
      <td className="text-sm text-black">{timestamp}</td>
      <td className={icon && iconClass}>
        {icon && <Icon path={mdiDelete} size={1} />}
      </td>
    </tr>
  );
};

export default NotificationContainer;
