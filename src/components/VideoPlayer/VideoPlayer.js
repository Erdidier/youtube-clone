import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

import "./VideoPlayer.css";

export const VideoPlayer = ({
  player,
  title,
  channel,
  views,
  timestamp,
  channelImage,
  subs,
  description,
}) => {
  const [reduce, setReduce] = useState(true);
  const handleDescription = () => {
    setReduce(!reduce);
  };
  console.log(player);

  return (
    <div className="videoPlayer">
      <iframe
        src={player}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="videoPlayer__video"
      />
      {/* <div dangerouslySetInnerHTML={{__html: player}} className="videoPlayer__thumbnail" /> */}
      <div className="videoPlayer__info">
        <h4>{title}</h4>
        <p>
          {views} views • {timestamp}
        </p>
        <span>
          <ThumbUpOutlinedIcon color="action" />
          Like
        </span>
        <hr />
        <div className="videoPlayer__info_user">
          <Avatar
            className="videoPlayer__avatar"
            alt={channel}
            src={channelImage}
          />
          <p>
            {channel} {subs} subscribers
          </p>
          <p>{reduce ? description.extended : description.reduced}</p>
          <Button onClick={handleDescription}>
            SHOW {reduce ? "MORE" : "LESS"}
          </Button>
          <hr />
        </div>
      </div>
    </div>
  );
};
