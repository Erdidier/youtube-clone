const express = require("express");
const { google } = require("googleapis");

const app = express();
const port = 5000;
const apiKey = "AIzaSyBQ-aBFY9RuBGluTYGcnzkaEj9Bk2RVJRM";
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

const nFormatter = (num, digits) => {
  let si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

let DateDiff = {
  inSeconds: (d1, d2) => {
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2 - t1) / 1000);
  },

  inMinutes: (d1, d2) => {
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2 - t1) / (60 * 1000));
  },

  inHours: (d1, d2) => {
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2 - t1) / (3600 * 1000));
  },

  inDays: (d1, d2) => {
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: (d1, d2) => {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  },
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, 	DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/api/search", async (req, res) => {
  try {
    const searchQuery = req.query.search_query;
    const orderSearch = req.query.order;
    const relatedVideo = req.query.related;
    const channelId = req.query.channel_id;
    const after = req.query.after;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
      maxResults: "12",
      type: "video",
      order: orderSearch,
      channelId: channelId,
      relatedToVideoId: relatedVideo,
      publishedAfter: after,
    });

    const videosId = response.data.items.map((item) => item.id.videoId);
    const channelsId = response.data.items.map(
      (item) => item.snippet.channelId
    );
    console.log(response.data.items.map((item) => item.id.videoId));
    console.log(videosId);
    console.log(`Channels: \n${channelsId}`);
    let videosUrl = "";
    videosId.map((videoId) => {
      videosUrl += `video_id=${videoId}&`;
    });
    let channelsUrl = "";
    channelsId.map((channelId) => {
      channelsUrl += `channel_id=${channelId}&`;
    });
    // res.json(response.data.items);
    res.json({ videos: videosUrl, channels: channelsUrl });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/videos", async (req, res) => {
  try {
    const videosId = req.query.video_id;
    const response = await youtube.videos.list({
      part: ["snippet", "player", "statistics"],
      id: videosId,
    });

    const videos = response.data.items;

    videos.map((video) => {
      let { viewCount } = video.statistics;
      let { publishedAt, description } = video.snippet;
      let d1 = new Date(publishedAt);
      let d2 = new Date();
      video.statistics.viewCount = nFormatter(viewCount, 2);

      if (DateDiff.inSeconds(d1, d2) < 60) {
        video.snippet.publishedAt = `${DateDiff.inSeconds(d1, d2)} seconds ago`;
      } else if (DateDiff.inMinutes(d1, d2) < 60) {
        video.snippet.publishedAt = `${DateDiff.inMinutes(d1, d2)} minutes ago`;
      } else if (DateDiff.inHours(d1, d2) < 24) {
        video.snippet.publishedAt = `${DateDiff.inHours(d1, d2)} hours ago`;
      } else if (DateDiff.inDays(d1, d2) < 7) {
        video.snippet.publishedAt = `${DateDiff.inDays(d1, d2)} days ago`;
      } else if (DateDiff.inWeeks(d1, d2) < 4) {
        video.snippet.publishedAt = `${DateDiff.inWeeks(d1, d2)} weeks ago`;
      } else if (DateDiff.inMonths(d1, d2) < 12) {
        video.snippet.publishedAt = `${DateDiff.inMonths(d1, d2)} months ago`;
      } else {
        video.snippet.publishedAt = `${DateDiff.inYears(d1, d2)} years ago`;
      }

      video.snippet.localized.description = description.substring(0, 100);
    });

    res.json(videos);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/subscriptions", async (req, res) => {
  try {
    const channelId = req.query.channel_id;
    const response = await youtube.subscriptions.list({
      part: ["snippet"],
      channelId: channelId,
    });

    const subscriptions = response.data.items;

    res.json(response.data.items);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    const videoId = req.query.video_id;
    const response = await youtube.commentThreads.list({
      part: ["snippet"],
      videoId: videoId,
      maxResults: "10",
    });

    const comments = response.data.items;

    comments.map((comment) => {
      let { publishedAt } = comment.snippet.topLevelComment.snippet;
      d1 = new Date(publishedAt);
      d2 = new Date();

      if (DateDiff.inSeconds(d1, d2) < 60) {
        comment.snippet.topLevelComment.snippet.publishedAt = `${DateDiff.inSeconds(
          d1,
          d2
        )} seconds ago`;
      } else if (DateDiff.inMinutes(d1, d2) < 60) {
        comment.snippet.topLevelComment.snippet.publishedAt = `${DateDiff.inMinutes(
          d1,
          d2
        )} minutes ago`;
      } else if (DateDiff.inHours(d1, d2) < 24) {
        comment.snippet.topLevelComment.snippet.publishedAt = `${DateDiff.inHours(
          d1,
          d2
        )} hours ago`;
      } else if (DateDiff.inDays(d1, d2) < 7) {
        comment.snippet.topLevelComment.snippet.publishedAt = `${DateDiff.inDays(
          d1,
          d2
        )} days ago`;
      } else if (DateDiff.inWeeks(d1, d2) < 4) {
        comment.snippet.topLevelComment.snippet.publishedAt = `${DateDiff.inWeeks(
          d1,
          d2
        )} weeks ago`;
      } else if (DateDiff.inMonths(d1, d2) < 12) {
        comment.snippet.topLevelComment.snippet.publishedAt = `${DateDiff.inMonths(
          d1,
          d2
        )} months ago`;
      } else {
        comment.snippet.topLevelComment.snippet.publishedAt = `${DateDiff.inYears(
          d1,
          d2
        )} years ago`;
      }
    });

    res.json(response.data.items);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/playlists", async (req, res) => {
  try {
    const channelId = req.query.channel_id;
    const response = await youtube.playlists.list({
      part: ["snippet", "player", "contentDetails"],
      id: channelId,
      maxResults: "2",
    });

    const playlists = response.data.items;

    playlists
      .map((playlist) => {
        let { itemCount } = playlist.contentDetails;
        playlist.contentDetails.itemCount = nFormatter(itemCount, 2);
      })
      .reverse();
    res.json(response.data.items);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/shorts", async (req, res) => {
  try {
    const query = req.query.query;
    axios
      .get(
        `https://serpapi.com/search.json?q=${query}&device=mobile&hl=en&gl=us`
      )
      .then((response) => {
        res.json(response.data);
      });

    // res.json(search.json(params, callback));
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/channels", async (req, res) => {
  try {
    const channelsId = req.query.channel_id;
    const response = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: channelsId,
    });
    // const channelsImg = response.data.items.map(item => item.snippet.thumbnails.medium);
    const channels = response.data.items;

    channels.map((channel) => {
      let { subscriberCount } = channel.statistics;
      channel.statistics.subscriberCount = nFormatter(subscriberCount, 2);
    });
    // console.log(channels)
    res.json(response.data.items);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
