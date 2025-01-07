import Icon from "@mdi/react";
import { mdiBell } from "@mdi/js";

export const NotificationAlert = () => {
  return (
    <div className="relative bg-white rounded-full p-1">
      <Icon path={mdiBell} size={1} className="text-black mt-1" />
      <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
        6
      </span>
    </div>
  );
};
