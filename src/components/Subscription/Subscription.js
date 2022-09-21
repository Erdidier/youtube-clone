import React, { useEffect, useState, useContext } from "react";
import "./Subscription.css";
import { VideoCard } from "../VideoCard/VideoCard";
import { Link } from "react-router-dom";
import { VideosContext } from "../../Context/VideosContext";

const axios = require("axios");

export const Subscription = () => {
  const [todayVideos, setTodayVideos] = useState([]);
  const [todayVideosUrl, setTodayVideosUrl] = useState("");
  const [weekVideos, setWeekVideos] = useState([]);
  const [weekVideosUrl, setWeekVideosUrl] = useState("");
  const [monthVideos, setMonthVideos] = useState([]);
  const [monthVideosUrl, setMonthVideosUrl] = useState("");

  const { menu, setIsOnVideoPage } = useContext(VideosContext);

  const getWeek = () => {
    let today = new Date();
    let day = today.getDay();
    let diff = today.getDate() - day + (day === 0 ? -6 : 1);
    let weekStart = new Date(today.setDate(diff)).toISOString();
    return weekStart;
  };

  const getMonth = () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let dateString = `${year}-${month}-01T00:00:00.000Z`;
    return dateString;
  };

  console.log(getWeek());

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/search?channel_id=UC8p1vwvWtl6T73JiExfWs1g&order=date"
      )
      .then((response) => {
        setTodayVideosUrl(response.data.videos);
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .get(
        `http://localhost:5000/api/search?channel_id=UC8p1vwvWtl6T73JiExfWs1g&after=${getWeek()}`
      )
      .then((response) => {
        setWeekVideosUrl(response.data.videos);
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .get(
        `http://localhost:5000/api/search?channel_id=UC8p1vwvWtl6T73JiExfWs1g&after=${getMonth()}`
      )
      .then((response) => {
        setMonthVideosUrl(response.data.videos);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos?${todayVideosUrl}`)
      .then((response) => {
        console.log(response);
        let arr = [];
        response.data.map((item) => {
          if (item.snippet.title.length > 30) {
            item.snippet.title = item.snippet.title.substring(0, 30) + "...";
          }
          arr.push(item);
        });
        setTodayVideos(arr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [todayVideosUrl]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos?${weekVideosUrl}`)
      .then((response) => {
        console.log(response);
        let arr = [];
        response.data.map((item) => {
          if (item.snippet.title.length > 30) {
            item.snippet.title = item.snippet.title.substring(0, 30) + "...";
          }
          arr.push(item);
        });
        setWeekVideos(arr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [weekVideosUrl]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos?${monthVideosUrl}`)
      .then((response) => {
        console.log(response);
        let arr = [];
        response.data.map((item) => {
          if (item.snippet.title.length > 30) {
            item.snippet.title = item.snippet.title.substring(0, 30) + "...";
          }
          arr.push(item);
        });
        setMonthVideos(arr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [monthVideosUrl]);

  setIsOnVideoPage(false);

  return (
    <div className="subscriptions" style={!menu ? { width: "84%" } : {}}>
      <h2>Today</h2>
      <div className="subscriptions__videos">
        {todayVideos.map((video, index) => {
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
      <hr />
      <h2>This Week</h2>
      <div className="subscriptions__videos">
        {weekVideos.map((video, index) => {
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
      <hr />
      <h2>This Month</h2>
      <div className="subscriptions__videos">
        {monthVideos.map((video, index) => {
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
