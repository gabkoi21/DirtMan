import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { NotificationAlert } from "../../components/NotifcationAlert";
import { notifations } from "../../data/NotificationData";
import UserNav from "../../routes/UserRoutes";

const NotificationContainer = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%] h-screen">
        <UserNav />
      </aside>
      <main className="md:w-[84%] w-full mx-3 px-3 mt-20">
        <NotificationTable />
      </main>
    </div>
  );
};

const NotificationTable = () => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-between lg:mx-5">
          <NotificationListTitle />
          <NotificationAlert />
        </div>
        <div>
          <Notifications />
        </div>
      </div>

      <div className="relative overflow-x-auto md:shadow-md rounded-sm">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Notification
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Timestamp
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <NotificationFetch />
          </tbody>
        </table>
      </div>
    </>
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
    <tr>
      <td colSpan="5" className="xl:px-6 py-4">
        <p className="text-black text-xl">6 Notifications</p>
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
      <td className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {message}
      </td>
      <td className="text-sm text-black whitespace-nowrap">{timestamp}</td>
      <td className={icon ? iconClass : ""}>
        <button>{icon && <Icon path={mdiDelete} size={1} />}</button>
      </td>
    </tr>
  );
};

export default NotificationContainer;
