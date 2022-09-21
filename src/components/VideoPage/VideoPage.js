import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import "./VideoPage.css";
import { Comments } from "../Comments/Comments";
import { RelatedVideos } from "../RelatedVideos/RelatedVideos";
import { VideosContext } from "../../Context/VideosContext";

export const VideoPage = ({ videoId }) => {
  const [video, setVideo] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [url, setUrl] = useState("");
  const [channel, setChannel] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [comments, setComments] = useState([]);

  const { menu, setIsOnVideoPage } = useContext(VideosContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos?video_id=${videoId}`)
      .then((response) => {
        console.log(response);
        setVideo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:5000/api/search?related=${videoId}`)
      .then((response) => {
        console.log(response);
        setUrl(response.data.videos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [videoId]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos?${url}`)
      .then((response) => {
        console.log(response);
        setRelatedVideos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);
  useEffect(() => {
    setChannelId(video[0]?.snippet.channelId);
    axios
      .get(`http://localhost:5000/api/channels?channel_id=${channelId}`)
      .then((response) => {
        console.log(response);
        setChannel(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [channelId, video]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments?video_id=${videoId}`)
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [videoId]);

  setIsOnVideoPage(true);

  return (
    <div
      className="videoPage"
      style={
        !menu
          ? { width: "100%" }
          : { gridTemplateColumns: "auto auto", marginLeft: "0" }
      }
    >
      <div className="videoPage__videos">
        <VideoPlayer
          title={video[0]?.snippet.title}
          views={video[0]?.statistics.viewCount}
          timestamp={video[0]?.snippet.publishedAt}
          channelImage={channel[0]?.snippet.thumbnails.default.url}
          channel={channel[0]?.snippet.title}
          player={video[0]?.player.embedHtml.split('"')[5]}
          subs={channel[0]?.statistics.subscriberCount}
          description={{
            extended: video[0]?.snippet.localized.description,
            reduced: video[0]?.snippet.description,
          }}
        />
        {comments.map((comment) => {
          return (
            <Comments
              key={comment?.id}
              userImage={
                comment?.snippet.topLevelComment.snippet.authorProfileImageUrl
              }
              user={comment?.snippet.topLevelComment.snippet.authorDisplayName}
              comment={comment?.snippet.topLevelComment.snippet.textOriginal}
              timestamp={comment?.snippet.topLevelComment.snippet.publishedAt}
            />
          );
        })}
      </div>
      <div className="videoPage__related">
        {relatedVideos.map((video) => {
          return (
            <RelatedVideos
              title={video?.snippet.title}
              views={video?.statistics.viewCount}
              timestamp={video?.snippet.publishedAt}
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
