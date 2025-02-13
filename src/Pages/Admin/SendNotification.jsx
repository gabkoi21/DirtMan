// import { AdminNav } from "../../Routes/AdminRoutes";
const SendNotification = () => {
  return (
    <div className="flex">
      <aside className="md:w-[16%]  h-screen ">{/* <AdminNav /> */}</aside>
      <main className="w-[84%] p-4  mt-20">
        <NotificationSender />
      </main>
    </div>
  );
};

const NotificationSender = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      {/* Send Notification Section */}
      <div className="flex-1 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
        <p className="text-gray-600 mb-4">
          Compose and send a new notification
        </p>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Notification title"
            className="mt-1 w-full p-2 border-black rounded-md focus:outline-none focus:ring-0 focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Notification message"
            className="mt-1 w-full p-2 border-black rounded-md focus:outline-none focus:ring-0 focus:ring-black"
            rows="5"
            maxLength={280}
          />
          <div className="text-gray-500 text-sm mt-1">0 / 280</div>
        </div>
        <button className="w-1/2 bg-black text-white py-2 rounded-lg transition font-bold">
          Send Notification
        </button>
      </div>

      {/* Sent Notifications Section */}
      <div className="flex-1 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Notifications Sent</h2>
        <p className="text-gray-600 mb-4">
          List of recently sent notifications
        </p>
        <ul className="space-y-2"></ul>
      </div>
    </div>
  );
};

export default SendNotification;
