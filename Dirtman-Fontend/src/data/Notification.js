import { mdiClockOutline, mdiAlertCircleOutline } from "@mdi/js";

export const notifications = [
  {
    id: 1,
    feedback: "Missed Pickup",
    description: "Pickup at 123 Main St was missed due to access issues",
    time: "10 minutes ago",
    icon: mdiAlertCircleOutline,
    iconColor: "text-red-700",
  },

  {
    id: 4,
    feedback: "Pickup Delay",
    description:
      "Pickups in South District are delayed by 30 minutes due to traffic",
    time: "5 hours ago",
    icon: mdiClockOutline,
    iconColor: "text-yellow-400",
  },
];
