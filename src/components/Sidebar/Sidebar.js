import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { SidebarRow } from "../SidebarRow/SidebarRow";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { Link } from "react-router-dom";
import { Avatar, SvgIcon } from "@material-ui/core";
import { VideosContext } from "../../Context/VideosContext";
import { SubscriptionRow } from "../SubscriptionRow/SubscriptionRow";

const axios = require("axios");

export const Sidebar = () => {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/subscriptions?channel_id=UCeY0bbntWzzVIaj2z3QigXg"
      )
      .then(function (response) {
        setChannels(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  const { menu, isOnVideoPage } = useContext(VideosContext);
  const ShortsIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <path
          d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.65v-5.3L15 12l-5 2.65z"
          class="style-scope yt-icon"
        ></path>
      </SvgIcon>
    );
  };
  if (!isOnVideoPage) {
    return menu ? (
      <div className="sidebar">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow selected title="Home" Icon={HomeIcon} expand={menu} />
        </Link>
        <Link to="/trending" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Trending" Icon={WhatshotIcon} expand={menu} />
        </Link>
        <Link to="/shorts" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Shorts" Icon={ShortsIcon} expand={menu} />
        </Link>
        <Link
          to="/subscriptions"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Subscriptions"
            Icon={SubscriptionsIcon}
            expand={menu}
          />
        </Link>
        <hr />
        <Link to="/library" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Library" Icon={VideoLibraryIcon} expand={menu} />
        </Link>
        <Link to="/history" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="History" Icon={HistoryIcon} expand={menu} />
        </Link>
        <Link
          to="/your_videos"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Your videos"
            Icon={OndemandVideoIcon}
            expand={menu}
          />
        </Link>
        <Link
          to="/watch_later"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow title="Watch later" Icon={WatchLaterIcon} expand={menu} />
        </Link>
        <Link
          to="/liked_videos"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Liked videos"
            Icon={ThumbUpAltOutlinedIcon}
            expand={menu}
          />
        </Link>
        <Link
          to="/show_more"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Show more"
            Icon={ExpandMoreOutlinedIcon}
            expand={menu}
          />
        </Link>
        <hr />
        <h3>SUBSCRIPTIONS</h3>
        {channels.map((channel) => {
          console.log(channel);
          return (
            <SubscriptionRow
              channelImage={channel?.snippet.thumbnails.medium.url}
              title={channel?.snippet.title}
            />
          );
        })}
      </div>
    ) : (
      <div className="sidebar" style={{ width: "6%", overflow: "hidden" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow selected title="Home" Icon={HomeIcon} expand={menu} />
        </Link>
        <Link to="/trending" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Trending" Icon={WhatshotIcon} expand={menu} />
        </Link>
        <Link to="/shorts" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Shorts" Icon={ShortsIcon} expand={menu} />
        </Link>
        <Link
          to="/subscriptions"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Subscriptions"
            Icon={SubscriptionsIcon}
            expand={menu}
          />
        </Link>
        <hr />
        <Link to="/library" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Library" Icon={VideoLibraryIcon} expand={menu} />
        </Link>
      </div>
    );
  } else {
    return menu ? (
      <div className="sidebar">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow selected title="Home" Icon={HomeIcon} expand={menu} />
        </Link>
        <Link to="/trending" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Trending" Icon={WhatshotIcon} expand={menu} />
        </Link>
        <Link to="/shorts" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Shorts" Icon={ShortsIcon} expand={menu} />
        </Link>
        <Link
          to="/subscriptions"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Subscriptions"
            Icon={SubscriptionsIcon}
            expand={menu}
          />
        </Link>
        <hr />
        <Link to="/library" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="Library" Icon={VideoLibraryIcon} expand={menu} />
        </Link>
        <Link to="/history" style={{ textDecoration: "none", color: "black" }}>
          <SidebarRow title="History" Icon={HistoryIcon} expand={menu} />
        </Link>
        <Link
          to="/your_videos"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Your videos"
            Icon={OndemandVideoIcon}
            expand={menu}
          />
        </Link>
        <Link
          to="/watch_later"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow title="Watch later" Icon={WatchLaterIcon} expand={menu} />
        </Link>
        <Link
          to="/liked_videos"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Liked videos"
            Icon={ThumbUpAltOutlinedIcon}
            expand={menu}
          />
        </Link>
        <Link
          to="/show_more"
          style={{ textDecoration: "none", color: "black" }}
        >
          <SidebarRow
            title="Show more"
            Icon={ExpandMoreOutlinedIcon}
            expand={menu}
          />
        </Link>
        <hr />
        <h3>SUBSCRIPTIONS</h3>
        {channels.map((channel) => {
          console.log(channel);
          return (
            <SubscriptionRow
              channelImage={channel?.snippet.thumbnails.medium.url}
              title={channel?.snippet.title}
            />
          );
        })}
      </div>
    ) : null;
  }
};
