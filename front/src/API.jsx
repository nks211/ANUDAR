import axios from "axios";

export const getAuthor = async (username) => {
    const url = "/api/user/info/author/nickname/}" + username
    return axios.get(url, username)
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch((e) => {console.log(e)});
};