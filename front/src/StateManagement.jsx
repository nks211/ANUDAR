import { create } from "zustand";
import { immer } from "zustand/middleware";

// 로그인, 회원가입, 메뉴바, 로그인 모달 입력값 관련 상태 관리 함수
export const mainstate = create((set) => ({
    login: false,
    loginuser: {},
    logintoken: "",
    signup: {
        profileimage: "../../asset/profile_image.png",
        id: "",
        password: "",
        passwordcheck: "",
        name: "",
        nickname: "",
        birthday: "",
        email: "",
        number: "",
    },
    notice: 0,
    noticelist: [
        {
            title: "알림 제목",
            date: "2024/02/05 16:00",
            details: "알림에 대한 자세한 설명 1",
        },
        {
            title: "알림 제목",
            date: "2024/02/05 16:00",
            details: "알림에 대한 자세한 설명 2",
        },
        {
            title: "알림 제목",
            date: "2024/02/05 16:00",
            details: "알림에 대한 자세한 설명 3",
        },
        {
            title: "알림 제목",
            date: "2024/02/05 16:00",
            details: "알림에 대한 자세한 설명 4",
        },
        {
            title: "알림 제목",
            date: "2024/02/05 16:00",
            details: "알림에 대한 자세한 설명 5",
        },
    ],
    tabbar: ["전시회", "작가", "작품", "경매"],
    menutab: "",
    idinput: "",
    passwordinput: "",

    setlogin: (result) => set(() => ({ login: result })),
    setloginuser: (user) => set(() => ({ loginuser: user })),
    setlogintoken: (token) => set(() => ({ logintoken: token })),
    setprofileimage: (image) => set((state) => ({ signup: { ...state.signup, profileimage: image } })),
    setidinput: (input) => set((state) => ({ signup: { ...state.signup, id: input } })),
    setpasswordinput: (input) => set((state) => ({ signup: { ...state.signup, password: input } })),
    setpasswordcheckinput: (input) => set((state) => ({ signup: { ...state.signup, passwordcheck: input } })),
    setnameinput: (input) => set((state) => ({ signup: { ...state.signup, name: input } })),
    setnicknameinput: (input) => set((state) => ({ signup: { ...state.signup, nickname: input } })),
    setbirthdayinput: (input) => set((state) => ({ signup: { ...state.signup, birthday: input } })),
    setemailinput: (input) => set((state) => ({ signup: { ...state.signup, email: input } })),
    setnumberinput: (input) => set((state) => ({ signup: { ...state.signup, number: input } })),

    setnotice: (result) => set(() => ({ notice: result })),
    noticecheck: (notice) => set((state) => ({
        noticelist: state.noticelist.filter((item) => { return JSON.stringify(item) != JSON.stringify(notice); })
    })),
    setmenutab: (tab) => set(() => ({ menutab: tab })),
    setloginidinput: (input) => set(() => ({ idinput: input })),
    setloginpasswordinput: (input) => set(() => ({ passwordinput: input })),
    logincomplete: (loginid, loginpassword) => set((state) => ({ loginuser: { ...state.loginuser, id: loginid, password: loginpassword, } })),

}));

// 전시회 목록 및 상세 조회 관련 상태 관리 함수
export const exhibitionstate = create((set) => ({

}));

// 작품 목록 및 상세 조회 관련 상태 관리 함수
export const workstate = create((set) => ({

}));

// 작가 목록 및 상세 조회 관련 상태 관리 함수
export const artiststate = create((set) => ({

}));

// 경매 관련 상태 관리 함수
export const auctionstate = create((set) => ({

}));

// 마이페이지 관련 상태 관리 함수
export const mypagestate = create((set) => ({

    mytab: ["내 정보", "찜한 전시회", "찜한 작품", "팔로잉 목록", "경매 내역", "내 전시", "내 작품"],
    mytabindex: "",
    scroll: 0,
    scrollref: {},
    myeditmode: false,
    updates: {
        newnickname: "",
        newphonenumber: "",
        newpassword: "",
        newpasswordcheck: "",
        newprofileimage: "",
    },
    myprofile: "",
    myinfo: {
        mynickname: "",
        myfollower: 0,
        myfollowing: 0,
        myid: "",
        mypassword: "",
        mybirthday: "",
        mynumber: "",
    },
    myfavorites: {
        likeexhibitions: [],
        likeworks: [],
        followingartist: [],
        myexhibitions: [],
        myworks: [],
        myauctions: [],
    },
    foldermode: [false, false, false, false, false, false,],

    setmytabindex: (index) => set(() => ({ mytabindex: index })),
    setscroll: (scrollnumber) => set(() => ({ scroll: scrollnumber })),
    setmyeditmode: (result) => set(() => ({ myeditmode: result })),
    setnewnickname: (input) => set((state) => ({ updates: { ...state.updates, newnickname: input } })),
    setnewphonenumber: (input) => set((state) => ({ updates: { ...state.updates, newphonenumber: input } })),
    setnewpassword: (input) => set((state) => ({ updates: { ...state.updates, newpassword: input } })),
    setnewpasswordcheck: (input) => set((state) => ({ updates: { ...state.updates, newpasswordcheck: input } })),
    passwordupdate: (oldpassword, newpassword) => {

    },
    setnewprofileimage: (input) => set((state) => ({ updates: { ...state.updates, newprofileimage: input } })),
    getmyinfo: () => {
        
    },
    updatemyinfo: (newinfo) => {

    },
    getmyfavorites: () => {

    },
    setfoldermode: (button) => {
        
    },
    scrolltoref: (ref) => {

    },

}));

// 팝업 모달창 관련 상태 관리 함수
export const popupstate = create((set) => ({

    homepopup: false,
    homenoticepopup: false,
    signuppopup: false,
    mypagecheckpopup: false,
    mypagechangepopup: false,
    paymentPopup: false,

    sethomepopup: (result) => set(() => ({ homepopup: result })),
    sethomenoticepopup: (result) => set(() => ({ homenoticepopup: result })),
    setsignuppopup: (result) => set(() => ({ signuppopup: result })),
    setmypagecheckpopup: (result) => set(() => ({ mypagecheckpopup: result })),
    setmypagechangepopup: (result) => set(() => ({ mypagechangepopup: result })),
    setPaymentPopup: (result) => set(() => ({ paymentPopup: result })),

}));

// 도슨트 화면 관련 상태 관리 함수
export const docentstate = create((set) => ({

}));

// 전시회 및 작품 등록 페이지 관련 상태 관리 함수
export const registstate = create((set) => ({

}));

// 검색 입력창 관련 상태 관리 함수
export const searchstate = create((set) => ({

}));


// export const today = 0;

export function getToday() {
    
}