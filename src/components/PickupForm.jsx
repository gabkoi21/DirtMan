// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WastePickupForm = () => {
  return (
    <form className="max-w-sm mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Request Pickup</h2>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          type="text"
          id="location"
          className="p-2 mt-1 border w-full rounded-md focus:ring-0 focus:ring-none focus:outline-none sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="wasteType"
          className="block text-sm font-medium text-gray-700"
        >
          Waste Type
        </label>
        <select
          id="wasteType"
          className="p-2 mt-1 border w-full rounded-md focus:ring-0 focus:ring-none focus:outline-none sm:text-sm select-none"
          required
        >
          <option value="organic">Organic</option>
          <option value="plastic">Plastic</option>
          <option value="paper">Paper</option>
          <option value="metal">Metal</option>
          <option value="glass">Glass</option>
          <option value="textile">Textile</option>
        </select>
      </div>

      <div className="mb-4 md:flex flex-row gap-5">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            className="p-2 mt-1 border w-full rounded-md focus:ring-0 focus:ring-none focus:outline-none sm:text-sm"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            className="p-2 mt-1 border w-full rounded-md focus:ring-0 focus:ring-none focus:outline-none sm:text-sm"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md shadow-sm"
      >
        Submit Request
      </button>
    </form>
  );
};

export default WastePickupForm;
