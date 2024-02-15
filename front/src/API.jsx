import axios from "axios";
import { mainstate } from "./StateManagement";

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

export const updateinfo = async (newdata, token) => {
    if (token && token != "") {
        const url = "/api/user/update";
        return await axios.put(url, newdata, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => { return response.data; })
        .catch((e) => { console.log(e); });
    }
};

// 팔로잉 조회
export async function getFollowing(token) {
  const url = "/api/user/following"
  const config = { headers : { Authorization: `Bearer ${token}` } }
  return await axios.get(url, config)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

//팔로워 조회
export async function getFollowers(token) {
    const url = "/api/user/follower"
    const config = { headers: { Authorization: `Bearer ${token}` } }
    return await axios.get(url, config)
    .then(res => {return res.data})
    .catch(err => {console.log(err)})
}

// 포인트 조회
export async function getUserPoints(token){
  const url = "/api/user/points"
  const config = { headers : { Authorization: `Bearer ${token}`}}
  return await axios.get(url, config)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 포인트 업데이트
export async function updateUserPoints(token, newPoints){
  const url = "/api/user/updatePoints"
  const data = {
    "points": newPoints
  };
  const config = {headers : {Authorization: `Bearer ${token}`}}
  return await axios.put(url, data, config)
    .then(res => {return res.data})
    .catch(err => {console.log(err)})
}

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

/* 알림 조회 */
export const getnotices = async (id, token) => {
    if (token && token != "") {
        const url = `/api/user/${id}/notifies`;
        return await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            return response.data;
        })
        .catch((e) => { console.log(e); });
    }
};

export const readnotice = async (noticeid, token) => {
    if (token && token != "") {
        const url = `/api/user/notifies/${noticeid}/read`;
        return await axios.put(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            return response.data;
        })
        .catch((e) => { console.log(e) });
    }
};

export const deletenotice = async (noticeid, token) => {
    if (token && token != "") {
        const url = `/api/user/notifies/${noticeid}`;
        return await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            return response.data;
        })
        .catch((e) => { console.log(e) });
    }
};

export const favoriteexhibitions = async (token) => {
  if (token && token != "") {
      const url = "/api/user/like/exhibit";
      return await axios.get(url, { headers: { Authorization: `Bearer ${token}`, } })
      .then(response => {
          return response.data;
      })
      .catch((e) => { console.log(e) });
  }
}

export const favoriteworks = async (token) => {
    if (token && token != "") {
        const url = "/api/user/like/work";
        return await axios.get(url, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => {
            return response.data;
        })
        .catch((e) => { console.log(e) });
    }
}

export const mybidworks = async (token) => {
    if (token && token != "") {
        const url = "/api/user/bid/work";
        return await axios.get(url, { headers: { Authorization: `Bearer ${token}`, } })
        .then(response => {
            return response.data;
        })
        .catch((e) => { console.log(e) });
    }
}

/* 전시회 페이지 */
// 전체 전시회 리스트
export async function getAllExhibitList() {
  const url = "/api/exhibit/list"
  try {
    const res = await axios.get(url)
    // console.log(res.data)
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
export async function uploadWorkImg(data, token) {
  const url = "/api/exhibit/workImgs";
  const form = new FormData();
  form.append("workImgs", data);

  const config = { headers : { Authorization: `Bearer ${token}` } }

  return await axios.post(url, form, config)
  .then(res => { return res.data ? res.data : "" })
  .catch((err) => { console.log(err); return ""; });
};

// 전시회 사진 등록
export async function uploadExhibitImg(data, token) {
  const url = "/api/exhibit/img";
  const form = new FormData();
  form.append("image", data)

  const config = { headers : { Authorization: `Bearer ${token}` } }

  return await axios.post(url, form, config)
  .then(res => {return res.data?res.data:""})
  .catch(err => {console.log(err); return ""})
}

// 전시회 등록
export async function registExhibit(data, token) {
  const url = "/api/exhibit/regist"
  const config = { headers : { 
    Authorization: `Bearer ${token}`,
    // 'Content-Type': 'application/json' 
  } }
  // application/json
  console.log(data)
  return await axios.post(url, data, config)
  .then(res => {return res.data})
  .catch(err => console.log(err))
}

// 전시 상세 조회
export async function getExhibitDetail(id) {
  const url = `/api/exhibit/list/${id}`
  return await axios.get(url)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 찜한 전시 목록
export async function getLikeExhibit(token) {
  const url = "/api/user/like/exhibit"
  const config = { headers : { Authorization: `Bearer ${token}` } }
  return await axios.get(url, config)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 전시 찜하기 및 취소
export async function likeExhibit(id, token) {
  const url = `/api/exhibit/like/${id}`
  const config = { headers : { Authorization: `Bearer ${token}` } }

  return await axios.post(url, {}, config)
  .then(res => {console.log(res)})
  .catch(err => {console.log(err)})
}

/* --- 방명록 --- */
// 방명록 작성
export async function createReview(id, data, token) {
  const url = `/api/exhibit/${id}/regist-comment`  // 전시회 id
  const config = { headers : { 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/text; charset=utf-8'
  }}
  return await axios.post(url, data, config)
  .then(res => {console.log(res.data.content); return res.data})
  .catch(err => console.log(err))
}

// 방명록 조회
export async function readReview(id) {
  const url = `/api/exhibit/${id}/comments-list`  // 전시회 id
  return await axios.get(url)
  .then(res => {return res.data})
  .catch(err => console.log(err))
}

// 방명록 삭제
export async function deleteReview(id, token) {
  const url = `/api/exhibit/${id}`  // 리뷰 id
  const config = { headers : { Authorization: `Bearer ${token}` } }
  return await axios.delete(url, config)
  .then(res => {alert('방명록이 삭제되었습니다.'); return res.data})
  .catch(err => {console.log(err)})

}

/* ------------------------------- 작가 페이지 ------------------------------- */
// 전체 작가 조회
export async function getAuthors() {
  const url = "/api/user/authors"
  return await axios.get(url)
  .then(res => {return res.data; })
  .catch(err => {console.log(err)})
}

// 작가 상세 조회
export async function getAuthor(name) {
  const url = `/api/user/info/author/${name}`
  return await axios.get(url)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 작가 팔로우
export async function followAuthor(name, token) {
  const url = `/api/user/follow/${name}`
  const config = { headers : { Authorization: `Bearer ${token}` } }
  return await axios.post(url, {}, config)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 작가 언팔로우
export async function unfollowAuthor(name, token) {
  const url = `/api/user/unfollow/${name}`
  const config = { headers : { Authorization: `Bearer ${token}` } }
  return await axios.delete(url, config)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}



/* ------------------------------- 작품 페이지 ------------------------------- */
// 전체 작품 조회
export async function getWorks() {
  const url = "/api/work"
  return await axios.get(url)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 작품 상세 조회
export async function getWork(id) {
  const url = `/api/work/infos/${id}`
  return await axios.get(url)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 찜한 작품 목록
export async function getLikeWorks(token) {
  const url = "/api/user/like/work"
  const config = { headers : { Authorization: `Bearer ${token}` } }
  return await axios.get(url, config)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}

// 작품 찜하기 및 취소
export async function likeWork(id, token) {
  const url = `/api/work/like/${id}`
  const config = { headers : { Authorization: `Bearer ${token}` } }

  return await axios.post(url, {}, config)
  .then(res => {console.log(res)})
  .catch(err => {console.log(err)})
}

// 작가 작품 조회
export async function getAuthorWorks(name, token) {
  const url = `/api/work/user/${name}`
  const config = { headers : { Authorization: `Bearer ${token}` } }

  return await axios.get(url, config)
  .then(res => {return res.data})
  .catch(err => {console.log(err)})
}


/* 경매 페이지*/
// 경매에 오를 작품
export const auctionlist = async () => {
    const url = "/api/auction/works";
    return await axios.get(url)
    .then(response => { return response.data; })
    .catch((e) => { console.log(e); })
};

// 낙찰
export const successbid = async (finalPrice, workId, nickname, auctionId) => {
  const url = "/api/auction/bidok";
  const data = {
      finalPrice : finalPrice,
      workId : workId, 
      nickname : nickname,
      auctionId : auctionId
  }
  return await axios.post(url, data,{
      headers: {
          'Authorization': "Bearer " + window.localStorage.getItem('token')
      }
  })
  .then(response => {
      console.log(response.data);
  })
  .catch((e) => { console.log(e); return {}; });
};
