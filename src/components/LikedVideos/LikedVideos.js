import React, { useState, useEffect } from "react";
import "./LikedVideos.css";
import { VideoCard } from "../VideoCard/VideoCard";
import axios from "axios";

export const LikedVideos = () => {
  //Acá se le cambia el nombre con el mismo del import de app.js
  const [videos, setVideos] = useState([]);
  const [videosUrl, setVideosUrl] = useState("");
  const [channelsUrl, setChannelsUrl] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/search?search_query=followers&order=relevance&channel_id=UCeY0bbntWzzVIaj2z3QigXg"
      )
      .then(function (response) {
        setVideosUrl(response.data.videos);
        setChannelsUrl(response.data.channels);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos?${videosUrl}`)
      .then(function (response) {
        let arr = [];
        response.data.map((item) => {
          if (item.snippet.title.length > 30) {
            item.snippet.title = item.snippet.title.substring(0, 30) + "...";
          }
          arr.push(item);
        });
        setVideos(response.data);
        console.log(response.data.items);
        console.log(videos);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [videosUrl]);
  return (
    <div className="likedVideos">
      <h2>Liked Videos</h2>
      <div className="likedVideos__videos">
        {videos.map((video, index) => {
          return (
            <VideoCard
              key={index}
              title={video?.snippet.title}
              views={video?.statistics.viewCount}
              timestamp={video?.snippet.publishedAt}
              channelImage="https://avatars.githubusercontent.com/u/93014692?v=4"
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
