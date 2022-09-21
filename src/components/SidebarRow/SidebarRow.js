import React from "react";
import "./SidebarRow.css";

export const SidebarRow = ({ title, Icon, selected, expand }) => {
  return (
    <div
      className={`sidebarRow ${selected ? "selected" : ""}`}
      style={!expand ? { display: "block" } : {}}
    >
      <Icon
        className="sidebarRow__icon"
        style={!expand ? { marginLeft: "5px" } : {}}
      />
      <h2
        className="sidebarRow__title"
        style={!expand ? { marginLeft: "0", fontSize: "10px" } : {}}
      >
        {title}
      </h2>
    </div>
  );
};
