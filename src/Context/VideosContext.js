import React, { createContext, useState } from "react";
import { searchVideos } from "../Services/videos.services";

export const VideosContext = createContext();

export const VideosContextProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const [isOnVideoPage, setIsOnVideoPage] = useState(false);
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [videosUrl, setVideosUrl] = useState("");
  const [channelsUrl, setChannelsUrl] = useState("");

  const search = (query) => {
    searchVideos(query)
      .then((response) => {
        // setVideosUrl(response.data.videos);
        // console.log("Response: " + response.data.videos);
        // setChannelsUrl(response.data.channels);
        return response.data.videos;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <VideosContext.Provider
      value={{
        menu,
        setMenu,
        isOnVideoPage,
        setIsOnVideoPage,
        videosUrl,
        search,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
