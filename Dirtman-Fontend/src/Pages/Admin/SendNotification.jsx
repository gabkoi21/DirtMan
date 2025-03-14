import { useState } from "react";
import Icon from "@mdi/react";
import { notifications } from "../../data/Notification";
import { mdiCheck, mdiClose, mdiSend, mdiBell } from "@mdi/js";

// Mock notification data

const TaskmanagementContainer = () => (
  <div className="flex">
    <aside className="md:w-[20%] lg:w-[23%] h-screen" />
    <main className="md:w-[98%] w-full mx-3 px-3 mt-20">
      <NotificationManagement />
    </main>
  </div>
);

const NotificationManagement = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const ShowFeedBack = () => {
    setShowFeedbackForm((prev) => !prev);
  };

  const closeModal = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mt-5 flex flex-row justify-between">
        <div>
          <h1 className="md:text-3xl font-bold md:px-4 text-gray-800">
            Notifications
          </h1>
        </div>
        <button
          className="bg-white flex flex-row gap-2 items-center text-black py-2 px-4 rounded shadow-sm hover:bg-gray-50 transition-colors"
          onClick={ShowFeedBack}
        >
          <Icon path={mdiSend} size={1} />
          Send Response
        </button>
      </div>

      <p className="text-gray-600 px-4">
        Stay updated with system alerts and notifications
      </p>

      {/* Horizontal line for separation */}
      <hr className="border-t-2 my-7 border-gray-200" />

      {/* Table Section */}
      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rounded-lg">
          <tbody>
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
              />
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showFeedbackForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <FeedbackForm onClose={closeModal} />
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationRow = ({ notification, allRead }) => {
  const { feedback, description, time, icon, iconColor } = notification;

  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="flex justify-between items-center">
            <div className=" flex text-base font-semibold text-gray-900">
              <span className={iconColor ? iconColor : "default-class"}>
                <Icon path={icon} size={0.9} className="mr-2" />
              </span>
              <span className="ml-2">{feedback}</span>
            </div>

            <div className="flex items-center gap-2">
              <div>{time}</div>
              <button>
                <Icon path={mdiCheck} size={0.8} className="text-green-500" />
              </button>
              <button>
                <Icon path={mdiClose} size={0.8} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mt-2 ml-10">{description}</div>
      </td>
    </tr>
  );
};

const FeedbackForm = ({ onClose }) => {
  return (
    <div className="w-[30%]  bg-white shadow-md rounded p-6">
      <div className="flex  items-center justify-between ">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Feedback Form
        </h2>
        <button onClick={onClose}>
          <Icon className="-mt-4" path={mdiClose} size={1} />
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-600 font-medium mb-1"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-0 "
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-600 font-medium mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            required
            className="w-full border border-gray-300 rounded-sm px-3 py-2 h-28 focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-950 text-white font-semibold py-2 rounded hover:bg-green-950 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskmanagementContainer;
