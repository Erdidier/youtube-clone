import { Avatar } from "@material-ui/core";
import React from "react";
import "./SubscriptionRow.css";

export const SubscriptionRow = ({ title, channelImage }) => {
  return (
    <div className="subscriptionRow">
      <Avatar className="subscriptionRow__icon" src={channelImage} />
      <h2 className="subscriptionRow__title">{title}</h2>
    </div>
  );
};
