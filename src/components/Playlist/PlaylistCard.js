import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./PlaylistCard.css";

export const PlaylistCard = ({
  image,
  title,
  channel,
  timestamp,
  channelImage,
  link,
}) => {
  return (
    <div className="playlistCard">
      <Link
        to={`/video/${link}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img src={image} alt="" className="playlistCard__thumbnail" />
        <div className="playlistCard__info">
          <Avatar
            className="playlistCard__avatar"
            alt={channel}
            src={channelImage}
          />

          <div className="playlistCard__text">
            <h4>{title}</h4>
            <p>{channel}</p>
            <p>• {timestamp}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
