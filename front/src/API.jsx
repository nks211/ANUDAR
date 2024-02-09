import axios from "axios";

export const uploadimage = async (data) => {
  const url = "/api/user/img";
  const form = new FormData();
  form.append("image", data);
  return await axios.post(url, form)
    .then(response => { return response.data ? response.data : "" })
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
  return await axios.post(url, { "username": id, "password": password })
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


/* 전시회 페이지 */

// 전체 전시회 리스트
// export const getAllExhibitList = async () => {
//   const url = "/api/exhibit/list"
//   return await axios.get(url)
//   .then((res) => { return (res.data); })
//   .catch((err) => { console.log(err); /* return {}; */ });
// }

// // 진행 중인 전시회 리스트
// export const getCurExhibitList = async () => {
//   const url = "/api/exhibit/list/current"
//   return await axios.get(url)
//   .then(res => { return (res.data); })
//   .catch((err) => { console.log(err); });
// }


// 전체 전시회 리스트
export async function getAllExhibitList() {
  const url = "/api/exhibit/list"
  try {
    const res = await axios.get(url)
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// 진행 중인 전시회 리스트
export async function getCurExhibitList() {
  const url = "/api/exhibit/list/current"
  try {
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// 작품사진 등록
export async function uploadWorkImg(data) {
  const url = "/api/exhibit/workImgs";
  const form = new FormData();
  form.append("image", data);
  try {
    return await axios.post(url, form)
      .then(res => { return res.data ? res.data : "" })
  } catch (err) {
    console.log(err)
  }
};