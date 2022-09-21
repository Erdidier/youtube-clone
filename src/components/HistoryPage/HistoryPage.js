import React, { useEffect, useState, useContext } from "react";
import "./HistoryPage.css";
import { VideoCard } from "../VideoCard/VideoCard";
import { Link } from "react-router-dom";
import { VideosContext } from "../../Context/VideosContext";
import { Input } from "@material-ui/core";
import { Label } from "@material-ui/icons";

const axios = require("axios");

export const HistoryPage = () => {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videosUrl, setVideosUrl] = useState("");
  const [channelsUrl, setChannelsUrl] = useState("");

  const { menuOpen, setIsOnVideoPage } = useContext(VideosContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/search?search_query=music")
      .then((response) => {
        setVideosUrl(response.data.videos);
        setChannelsUrl(response.data.channels);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  //   search("music");
  //   console.log("Videos: " + videosUrl);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos?${videosUrl}`)
      .then((response) => {
        console.log(response);
        let arr = [];
        response.data.map((video) => {
          if ("snippet" in video) {
            arr.push(video);
          }
        });
        setVideos(arr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [videosUrl]);

  setIsOnVideoPage(false);

  return (
    <div className="historyPage">
      <div className="historyPage__videos">
        <h2>Watch History</h2>
        {videos.map((video, index) => {
          if ("snippet" in video) {
            console.log(video?.channel?.url);
            // console.log(video);
            return (
              <VideoCard
                key={index}
                title={video?.snippet.title}
                views={video?.statistics.viewCount}
                timestamp={video?.snippet.publishedAt}
                channelImage={video?.channel?.url}
                channel={video?.snippet.channelTitle}
                image={video?.snippet.thumbnails.medium.url}
                link={video?.id}
              />
            );
          }
        })}
      </div>
      <div className="historyPage__panel">
        <h2>History Type</h2>
        <hr />
        <div className="historyPage__panel__watch">
          <label htmlFor="watch">Watch</label>
          <input type="radio" name="watch" id="watch" value="watch" />
        </div>
        <hr />
        <div className="historyPage__panel__community">
          <label htmlFor="watch">Community</label>
          <input type="radio" name="watch" id="watch" value="watch" />
        </div>
      </div>
    </div>
  );
};
