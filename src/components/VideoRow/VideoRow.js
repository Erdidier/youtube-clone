import React from "react";
import { Link } from "react-router-dom";
import "./VideoRow.css";

export const VideoRow = ({
  views,
  subs,
  description,
  timestamp,
  channel,
  title,
  image,
  link,
}) => {
  return (
    <div className="videoRow">
      <Link
        to={`/video/${link}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img alt={channel} src={image} />
        <div className="videoRow__text">
          <h3>{title}</h3>
          <p className="videoRow__headline">
            {channel} •{" "}
            <span className="videoRow__subs">
              <span className="videoRow__subsNumber">{subs}</span> Subscribers
            </span>{" "}
            {views} views • {timestamp}
          </p>
          <p className="videoRow__description">{description}</p>
        </div>
      </Link>
    </div>
  );
};
