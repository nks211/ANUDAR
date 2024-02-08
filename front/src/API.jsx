import axios from "axios";

export const getAuthor = async (username) => {
    const url = "/api/user/nickname"
    return axios.post(url, username, {
        headers : {
            "Authorization" :  window.localStorage.getItem("authorization")
        }
    })
    .then()
    .catch((e) => {console.log(e)});
};