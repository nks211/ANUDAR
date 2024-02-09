import axios from "axios";

export const getAuthor = async (username) => {
    const url = "/api/user/info/author/nickname/}" + username
    return axios.get(url, username)
    .then(response => {
        console.log(response.data);
        return response.data;
    })
};
    
export const uploadimage = async (data) => {
    const url = "/api/user/img";
    const form = new FormData();
    form.append("image", data);
    return await axios.post(url, form)
    .then(response => { return response.data? response.data : "" })
    .catch((e) => { console.log(e); return ""; });
};

export const checkid = async (id) => {
    const url = "/api/user/username";
    return await axios.post(url, id)
    .then(response => {
        if (response.status === 200) return true;
        else return false;
    })
    .catch((e) => { console.log(e); return false; });
};

export const checknickname = async (nickname) => {
    const url = "/api/user/nickname";
    return await axios.post(url, nickname)
    .then(response => { 
        if (response.status === 200) return true;
        else return false;
    })
    .catch((e) => { console.log(e); return false; });
};

export const signup = async (userdata) => {
    const url = "/api/user/join";
    return await axios.post(url, userdata)
    .then(response => { return response.data; })
    .catch((e) => { console.log(e); });
};

export const login = async (id, password) => {
    const url = "/api/user/login";
    return await axios.post(url, {"username" : id, "password": password})
    .then(response => { return response.data; })
    .catch((e) => { console.log(e); return ""; });
};

export const myinfo = async (token) => {
    if (token && token != "") {
        const url = "/api/user/info";
        return await axios.get(url, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => { return response.data; })
        .catch((e) => { console.log(e); return {}; });
    }
    else { alert("유효하지 않은 토큰입니다."); }
};

export const updateinfo = () => {

};

export const changepassword = () => {

};

export const signout = () => {
};