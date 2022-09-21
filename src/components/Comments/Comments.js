import React from "react";
import { Avatar } from "@material-ui/core";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

import "../VideoPlayer/VideoPlayer.css";

export const Comments = ({ userImage, user, comment, timestamp }) => {
  return (
    <div className="videoPlayer">
      <div className="videoPlayer__info">
        <div className="videoPlayer__comment">
          <Avatar
            // style={{display: "inline-flex"}}
            className="videoPlayer__avatar"
            alt={user}
            src={userImage}
          />
          <p>
            {user} {timestamp}
          </p>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};
