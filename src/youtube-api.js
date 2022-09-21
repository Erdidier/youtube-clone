const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com/search',
  params: {
    relatedToVideoId: '7ghhRHRP6t4',
    part: 'id,snippet',
    type: 'video',
    maxResults: '8'
  },
  headers: {
    'X-RapidAPI-Key': 'd9ded79661msh6c5d631ba510aeep18a8cbjsn1e92a6f80de6',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

const getVideos = async () => {
  return new Promise((resolve, reject) => {
  axios.request(options).then(function (response) {
    // console.log(response.data);
      resolve(response.data.items);
      // console.log("title: " + response.data.items[0].snippet.title);
      // console.log("thumbnail: " + response.data.items[0].snippet.thumbnails.default.url);
      // console.log("description: " + response.data.items[0].snippet.description);
  }).catch(function (error) {
     reject(error);
     console.error(error);
  });
  });
}
export default getVideos;
