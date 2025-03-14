import React from "react";
import { Icon } from "@mdi/react";
import { mdiCheckCircle, mdiProgressClock, mdiClockOutline } from "@mdi/js"; // Import MDI icons

export const AssignedPickup = [
  {
    id: 1,
    address: "123 Main St",
    wasteType: "Commercial waste",
    time: "10:00 AM",
    status: "Completed",
    icon: mdiCheckCircle, // Add icon to data
  },
  {
    id: 2,
    address: "456 Elm St",
    wasteType: "Residential waste",
    time: "11:30 AM",
    status: "In Progress",
    icon: mdiProgressClock, // Add icon to data
  },
  {
    id: 3,
    address: "789 Oak St",
    wasteType: "Organic waste",
    time: "1:00 PM",
    status: "pending",
    icon: mdiClockOutline, // Add icon to data
  },
];
