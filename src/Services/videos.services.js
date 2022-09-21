import axios from "axios";

const httpUrlApi = "http://localhost:5000/api";

export const searchVideos = (query) => {
    let queryParameter = `search_query=${query}`
    return axios
        .get(`${httpUrlApi}/search?${query ? queryParameter : ""}`)
        .then(response => console.log(response.data));
};