import React, { useState } from "react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { Dialog } from "@headlessui/react";

// Calendar Component
const Calendar = ({
  events,
  onTimeRangeSelected,
  onEventClick,
  onEventRightClick,
}) => {
  return (
    <DayPilotCalendar
      viewType="Week"
      durationBarVisible={false}
      timeRangeSelectedHandling="Enabled"
      onTimeRangeSelected={onTimeRangeSelected}
      onEventClick={onEventClick}
      onEventRightClick={onEventRightClick}
      events={events}
    />
  );
};

// EditPickupModal Component
const EditPickupModal = ({ isOpen, onClose, selectedEvent, onSave }) => {
  if (!selectedEvent) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Pickup</h2>

        <label className="block mb-2">Start Time:</label>
        <input
          type="datetime-local"
          value={selectedEvent.start}
          onChange={(e) => onSave({ ...selectedEvent, start: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">End Time:</label>
        <input
          type="datetime-local"
          value={selectedEvent.end}
          onChange={(e) => onSave({ ...selectedEvent, end: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedEvent)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

// Main PickupScheduler Component
const PickupScheduler = ({ onPickupSelected }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTimeRangeSelected = (args) => {
    const newEvent = {
      id: events.length + 1,
      text: "Waste Pickup",
      start: args.start.toString(),
      end: args.end.toString(),
      backColor: "#4CAF50",
    };

    setEvents([...events, newEvent]);
    onPickupSelected(newEvent);
  };

  const handleEventClick = (args) => {
    setSelectedEvent(args.e.data);
    setIsModalOpen(true);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsModalOpen(false);
  };

  const handleEventRightClick = (args) => {
    if (window.confirm("Are you sure you want to delete this pickup?")) {
      setEvents(events.filter((event) => event.id !== args.e.data.id));
    }
    args.preventDefault();
  };

  return (
    <div>
      <Calendar
        events={events}
        onTimeRangeSelected={handleTimeRangeSelected}
        onEventClick={handleEventClick}
        onEventRightClick={handleEventRightClick}
      />

      <EditPickupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedEvent={selectedEvent}
        onSave={handleUpdateEvent}
      />
    </div>
  );
};

export default PickupScheduler;
