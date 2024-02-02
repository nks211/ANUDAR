import { create } from "zustand";
import { immer, persist } from "zustand/middleware";

// 로그인, 회원가입, 메뉴바, 로그인 모달 입력값 관련 상태 관리 함수
const mainstate = create((set) => {
    login: false
    loginuser: {}
    signup: {
        profileimage: ""
        id: ""
        password: ""
        passwordcheck: ""
        name: ""
        nickname: ""
        birthday: ""
        email: ""
        number: ""
    }
    notice: 0
    noticelist: []
    tabbar: ["전시회", "작가", "작품", "경매"]
    menutab: ""
    idinput: ""
    passwordinput: ""

    setlogin: (result) => set({ login: result })
    setloginuser: (user) => set({ loginuser: user })
    setprofileimage: (image) => {

    }
    setidinput: (input) => set({ signup: { ... { id: input } } })
    setpasswordinput: (input) => set({ signup: { ... { password: input } } })
    setpasswordcheckinput: (input) => set({ signup: { ... { passwordcheck: input } } })
    setnameinput: (input) => set({ signup: { ... { name: input } } })
    setnicknameinput: (input) => set({ signup: { ... { nickname: input } } })
    setbirthdayinput: (input) => set({ signup: { ... { birthday: input } } })
    setemailinput: (input) => set({ signup: { ... { email: input } } })
    setnumberinput: (input) => set({ signup: { ... { number: input } } })

    setnotice: (result) => set({ notice: result })
    getnotice: () => {

    }
    checknotice: (notice) => {

    }
    setmenutab: (tab) => set({ menutab: tab })
    setloginidinput: (input) => set({ idinput: input })
    setloginpasswordinput: (input) => set({ passwordinput: input })
    loginenter: (loginid, loginpass) => {

    }

});

// 전시회 목록 및 상세 조회 관련 상태 관리 함수
const exhibitionstate = create((set) => {

});

// 작품 목록 및 상세 조회 관련 상태 관리 함수
const workstate = create((set) => {

});

// 작가 목록 및 상세 조회 관련 상태 관리 함수
const artiststate = create((set) => {

});

// 경매 관련 상태 관리 함수
const auctionstate = create((set) => {

});

// 마이페이지 관련 상태 관리 함수
const mypagestate = create((set) => {

    mytab: ["내 정보", "찜한 전시회", "찜한 작품", "팔로잉 목록", "경매 내역", "내 전시", "내 작품"]
    mytabindex: ""
    scroll: 0
    scrollref: {}
    myeditmode: false
    updates: {
        newnickname: ""
        newphonenumber: ""
        newpassword: ""
        newpasswordcheck: ""
    }
    myprofile: ""
    myinfo: {
        mynickname: ""
        myfollower: 0
        myfollowing: 0
        myid: ""
        mypassword: ""
        mybirthday: ""
        mynumber: ""
    }
    myfavorites: {
        likeexhibitions: []
        likeworks: []
        followingartist: []
        myexhibitions: []
        myworks: []
        myauctions: []
    }
    foldermode: [false, false, false, false, false, false,]

    setmytabindex: (index) => set({ mytabindex: index })
    setscroll: (scrollnumber) => set({ scroll: scrollnumber })
    setmyeditmode: (result) => set({ myeditmode: result })
    setnewnickname: (input) => set({ updates: { ... { newnickname: input } } })
    setnewphonenumber: (input) => set({ updates: { ... { newphonenumber: input } } })
    setnewpassword: (input) => set({ signup: { ... { newpassword: input } } })
    setnewpasswordcheck: (input) => set({ updates: { ... { newpasswordcheck: input } } })
    passwordupdate: (oldpassword, newpassword) => {

    }
    getmyinfo: () => {
        
    }
    updatemyinfo: (newinfo) => {

    }
    getmyfavorites: () => {

    }
    setfoldermode: (button) => {
        
    }
    scrolltoref: (ref) => {
        
    }

});

// 팝업 모달창 관련 상태 관리 함수
const popupstate = create((set) => {

    homepopup: false
    homenoticepopup: false
    signuppopup: false
    mypagecheckpopup: false
    mypagechangepopup: false

    sethomepopup: (result) => set({ homepopup: result })
    sethomenoticepopup: (result) => set({ homenoticepopup: result })
    setsignuppopup: (result) => set({ signuppopup: result })
    setmypagecheckpopup: (result) => set({ mypagecheckpopup: result })
    setmypagechangepopup: (result) => set({ mypagechangepopup: result })

});

// 도슨트 화면 관련 상태 관리 함수
const docentstate = create((set) => {

});

// 전시회 및 작품 등록 페이지 관련 상태 관리 함수
const registstate = create((set) => {

});

// 검색 입력창 관련 상태 관리 함수
const searchstate = create((set) => {

});