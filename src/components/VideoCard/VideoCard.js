import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./VideoCard.css";

export const VideoCard = ({
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
  link,
}) => {
  return (
    <div className="videoCard">
      <Link
        to={`/video/${link}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img src={image} alt="" className="videoCard__thumbnail" />
        <div className="videoCard__info">
          <Avatar
            className="videoCard__avatar"
            alt={channel}
            src={channelImage}
          />

          <div className="videoCard__text">
            <h4>{title}</h4>
            <p>{channel}</p>
            <p>
              {views} • {timestamp}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
