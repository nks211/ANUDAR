import axios from "axios";

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

export const myfollowings = async (token) => {
    if (token && token != "") {
        const url = "/api/user/following";
        return await axios.get(url, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => { return response.data; })
        .catch((e) => { console.log(e); return 0; });
    }
};

export const myfollowers = async (token) => {
    if (token && token != "") {
        const url = "/api/user/follower";
        return await axios.get(url, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => { return response.data; })
        .catch((e) => { console.log(e); return 0; });
    }
};

export const updateinfo = async (newdata, token) => {
    if (token && token != "") {
        const url = "/api/user/update";
        return await axios.put(url, newdata, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => { return response.data; })
        .catch((e) => { console.log(e); });
    }
};

export const changepassword = async (oldpassword, newpassword, token) => {
    if (token && token != "") {
        const url = "/api/user/update/password";
        const request = {
            "oldpassword": oldpassword,
            "checkpassword": newpassword,
            "newpassword": newpassword,
        };
        return await axios.put(url, request, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => { 
            if (response.status === 200) return response.data;
            else console.log(response.data);
        })
        .catch((e) => { console.log(e); });
    }
};

export const signout = async (token) => {
    if (token && token != "") {
        const url = "/api/user/signout";
        return await axios.delete(url, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => { 
            if (response.status === 200) return true;
            else return false; 
        })
        .catch((e) => { console.log(e); return false; });
    }
};