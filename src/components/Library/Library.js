import React, { useState, useEffect } from "react";
import "./Library.css";
import { VideoCard } from "../VideoCard/VideoCard";
import axios from "axios";
import { PlaylistCard } from "../Playlist/PlaylistCard";

export const Library = () => {
  //Acá se le cambia el nombre con el mismo del import de app.js
  const [videos, setVideos] = useState([]);
  const [videosUrl, setVideosUrl] = useState("");
  const [channelsUrl, setChannelsUrl] = useState("");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/search?search_query=starcraft%20remasterizado&order=relevance"
      )
      .then(function (response) {
        setVideosUrl(response.data.videos);
        setChannelsUrl(response.data.channels);
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .get(
        "http://localhost:5000/api/playlists?channel_id=UCBi2mrWuNuyYy4gbM6fU18Q"
      )
      .then(function (response) {
        setPlaylists(response.data);
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
    <div className="library">
      <h2>Library</h2>
      <div className="library__videos">
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
      <hr />
      <h2>Playlists</h2>
      <div className="library__videos">
        {playlists.map((video, index) => {
          return (
            <PlaylistCard
              key={index}
              title={video?.snippet.title}
              // views={video?.statistics.viewCount}
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
