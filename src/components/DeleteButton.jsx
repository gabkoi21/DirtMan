import React from "react";
import { Icon } from "@mdi/react";
import { mdiDelete } from "@mdi/js";

const DeleteButton = () => {
  return (
    <button className={`flex text-red-700`}>
      <Icon path={mdiDelete} size={1} />
    </button>
  );
};

export default DeleteButton;
