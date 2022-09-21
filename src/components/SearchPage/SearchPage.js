import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import { ChannelRow } from "../ChannelRow/ChannelRow";
import { VideoRow } from "../VideoRow/VideoRow";
import axios from "axios";

export const SearchPage = ({ searchTerm }) => {
  const [videos, setVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [videosUrl, setVideosUrl] = useState("");
  const [channelsUrl, setChannelsUrl] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/search?search_query=${searchTerm}`)
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
          if (item.snippet.description.length > 100) {
            item.snippet.description =
              item.snippet.description.substring(0, 100) + "...";
          }
          if (item.snippet.title.length > 30) {
            item.snippet.title = item.snippet.title.substring(0, 30) + "...";
          }
          arr.push(item);
        });
        setVideos(arr);
        console.log(response.data.items);
        console.log(videos);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [videosUrl]);
  return (
    <div className="searchPage">
      <div className="searchPage__filter">
        <TuneOutlinedIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      <ChannelRow
        image="https://avatars.githubusercontent.com/u/93014692?v=4"
        channel="SugamDev"
        verified
        subs="5.2M"
        noOfVideos={654}
        description="Nice description"
      />
      <hr />

      {videos.map((video, index) => {
        return (
          <VideoRow
            key={index}
            title={video?.snippet.title}
            views={video?.statistics.viewCount}
            timestamp={video?.snippet.publishedAt}
            channel={video?.snippet.channelTitle}
            subs={video?.statistics.subscriberCount}
            image={video?.snippet.thumbnails.medium.url}
            description={video?.snippet.description}
            link={video?.id}
          />
        );
      })}
    </div>
  );
};
