import React from "react";
import UserNav from "../Navigations/UserNav";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { NotificationAlert } from "../components/NotifcationAlert";
import { notifations } from "../data/NotificationData";

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
    <div className="relative overflow-x-auto md:shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 capitalize bg-gray-50">
          <tr>
            <th colSpan="5" className="p-3">
              <div className="flex flex-row justify-between">
                <NotificationListTitle />
                <NotificationAlert />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <Notifications />
          <NotificationFetch />
        </tbody>
      </table>
    </div>
  );
};

const NotificationListTitle = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex">
        <p className="text-xl font-bold text-black">List of Notifications</p>
      </div>
    </div>
  );
};

const Notifications = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td colSpan="5" className="px-6 py-4">
        <p className="text-base text-black">6 Notifications</p>
      </td>
    </tr>
  );
};

const NotificationFetch = () => {
  const notificationData = notifations;
  return (
    <>
      {notificationData.map((notification) => (
        <NotificationTableRow
          key={notification.id}
          notificationObj={notification}
        />
      ))}
    </>
  );
};

const NotificationTableRow = (props) => {
  // eslint-disable-next-line react/prop-types
  const { message, timestamp, icon, iconClass } = props.notificationObj;
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {message}
      </td>
      <td className="text-sm text-black">{timestamp}</td>
      <td className={icon ? iconClass : ""}>
        <button>{icon && <Icon path={mdiDelete} size={1} />}</button>
      </td>
    </tr>
  );
};

export default NotificationContainer;
