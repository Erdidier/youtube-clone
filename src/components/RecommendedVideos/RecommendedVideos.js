import React, { useEffect, useState, useContext } from "react";
import "./RecommendedVideos.css";
import { VideoCard } from "../VideoCard/VideoCard";
import { Link } from "react-router-dom";
import { VideosContext } from "../../Context/VideosContext";

const axios = require("axios");

export const RecommendedVideos = () => {
  const [videos, setVideos] = useState([]);
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
  // search("music");
  console.log("Videos: " + videosUrl);
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
    <div className="recommendedVideos">
      <h2>Recommended</h2>
      <div className="recommendedVideos__videos">
        {videos.map((video, index) => {
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
        })}
      </div>
    </div>
  );
};
