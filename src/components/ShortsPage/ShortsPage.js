import React, { useEffect, useState, useContext } from "react";
import "./ShortsPage.css";
import { VideoCard } from "../VideoCard/VideoCard";
import { Link } from "react-router-dom";
import { VideosContext } from "../../Context/VideosContext";
import { ShortsPlayer } from "../ShortsPlayer/ShortsPlayer";

const axios = require("axios");

export const ShortsPage = () => {
    const [videos, setVideos] = useState([]);
    const [channels, setChannels] = useState([]);
    // const [videosUrl, setVideosUrl] = useState("");
    const [channelsUrl, setChannelsUrl] = useState("");

    const { menuOpen, setIsOnVideoPage, search, videosUrl } = useContext(VideosContext);

    // useEffect(() => {
    //   axios.get("http://localhost:5000/api/search?search_query=music").then((response) => {
    //     setVideosUrl(response.data.videos);
    //     setChannelsUrl(response.data.channels);
    //   }).catch(function (error) {
    //     console.error(error);
    //   });
    // }, []);
    //   search("music");
    //   console.log("Videos: " + videosUrl);
    //   useEffect(() => {
    //     axios.get(`http://localhost:5000/api/videos?${videosUrl}`).then((response) => {
    //       console.log(response);
    //       let arr = [];
    //       response.data.map(video => {
    //         if("snippet" in video) {
    //           arr.push(video);
    //         }
    //       })
    //       setVideos(arr);
    //     }).catch((error) => {
    //       console.error(error);
    //     });

    //   }, [videosUrl])

    setIsOnVideoPage(false);

    return (
        <div className="shortsPage">
            <h2>Recommended</h2>
            <div className="shortsPage__videos">
                <ShortsPlayer
                    id="1"
                    src="https://www.youtube.com/embed/Yuy7Eyr3Ej4"
                    // src="https://img23.ropose.com/video/mvid/bISCoHc/uBKy_315560961836500fdd44d11-be16-474e-aac5-620df3d3e96a_4275937a_a822.mp4"
                    channel="Rare Media"
                    description="Tom Hanks had some of Hollywood's most popular movies in the late '90s and early 2000s."
                    like="1.5k"
                    dislike="1.5k"
                    share="1.5k"
                    comment="1.5k"
                />
            </div>
        </div>
    );
};