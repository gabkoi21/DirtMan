import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WastePickupForm = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, location, selectedDate });
  };

  return (
    <form
      className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold mb-6">Request Pickup</h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-none sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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

      <div className="mb-4 flex flex-row gap-5">
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
