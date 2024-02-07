import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import './signup.css';
import { mainstate } from "../StateManagement";

const phonenumberformatting = (number) => {
    return number.replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
};

function Signup() {

    const navigate = useNavigate();
    const {setPathName} = useContext(AppContext);

    const signupdata = mainstate(state => state.signup);
    const setidinput = mainstate(state => state.setidinput);
    const setpasswordinput = mainstate(state => state.setpasswordinput);
    const setpasswordcheckinput = mainstate(state => state.setpasswordcheckinput);
    const setnameinput = mainstate(state => state.setnameinput);
    const setnicknameinput = mainstate(state => state.setnicknameinput);
    const setbirthdayinput = mainstate(state => state.setbirthdayinput);
    const setnumberinput = mainstate(state => state.setnumberinput);
    const setemailinput = mainstate(state => state.setemailinput);
    const setprofileimage = mainstate(state => state.setprofileimage);

    const [profile, setProfile] = useState("../../asset/profile_image.png");
    const [preview, setPreview] = useState("../../asset/profile_image.png");
    const checkdata = mainstate((state) => state.signup);
    const [passwordcheck, setPasswordCheck] = useState(false);

    const idcheck = (id) => {
        // 중복 아이디 체크 요청
        return true;
    };
    const nicknamecheck = (nickname) => {
        // 중복 닉네임 체크 요청
        return true;
    };
    const signupcomplete = (event) => {
        event.preventDefault();

        if (!passwordcheck) {
            alert("비밀번호를 다시 확인해 주세요.");
        }
        else {
            if (!idcheck(signupdata.id)) alert("아이디 체크를 해 주세요.");
            if (!nicknamecheck(signupdata.nickname)) alert("닉네임 체크를 해 주세요.");
            localStorage.setItem("userdata", JSON.stringify(signupdata));
            setnumberinput(""); navigate("/"); window.scrollTo(0, 0);
            setPathName(window.location.pathname);
        }

    };

    const upload = (e) => {
        const file = e.target.files[0];
        if (file === null) return
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                const imageurl = URL.createObjectURL(file);
                setPreview(reader.result || null);
                setProfile(reader.result || null);
                setprofileimage(imageurl);
                resolve();
            };
        });
    }

    const passcheck = () => {
        checkdata.password && checkdata.passwordcheck && checkdata.password === checkdata.passwordcheck ? setPasswordCheck(true) : setPasswordCheck(false);
    }

    useEffect(() => passcheck(), [checkdata])

    return (
        <form className="signupArea" onSubmit={signupcomplete}>
            <div className="signupTitle">회원가입</div>
            <img id="profile" className="signupImage" src={preview} />
            <label className="signupProfile" for="imagefile" >프로필 파일 등록...</label>
            <input type="file" id="imagefile" accept="image/*" onChange={e => { upload(e); e.target.value = ""; }} style={{ display: "none" }} />
            <div className="signupColumn">
                <div className="name">
                    <div className="item"><span>* </span>ID</div>
                    <div className="item"><span>* </span>비밀번호</div>
                    <div className="item"><span>* </span>비밀번호 확인</div>
                    <div className="item"><span>* </span>이름</div>
                    <div className="item"><span>* </span>전화번호</div>
                    <div className="item"><span>* </span>닉네임</div>
                    <div className="item"><span>* </span>이메일</div>
                </div>
                <div className="inputarea">
                    <input id="id" className="line" onChange={(e) => { setidinput(e.target.value); }} required/>
                    <input id="password" type="password" className="line" onChange={(e) => { setpasswordinput(e.target.value); }} required/>
                    <input id="passwordcheck" type="password" className="line" onChange={(e) => { setpasswordcheckinput(e.target.value); }} required/>
                    <input id="name" className="line" onChange={(e) => { setnameinput(e.target.value); }} required/>
                    <input id="number" type="tel" className="line" value={signupdata.number} maxLength={13} onChange={(e) => { setnumberinput(phonenumberformatting(e.target.value)); }} required/>
                    <input id="nickname" className="line" onChange={(e) => { setnicknameinput(e.target.value); }} required/>
                    <input id="email" type="email" className="line" onChange={(e) => { setemailinput(e.target.value); }} required/>
                </div>
                <div className="check">
                    <div onClick={() => { idcheck(signupdata.id); }} style={{ position: "relative", left: "25px", top: "20px" }} className="button">
                        중복 ID 확인
                    </div>
                    <div style={{ position: "relative", top: "155px", fontSize: "11px", fontWeight: 600, }} className={passwordcheck ? "pwSame" : "pwDifferent"}>
                        {checkdata.password.length > 0 ? (passwordcheck ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다") : ""}
                    </div>
                    <div onClick={() => { }} style={{ position: "relative", left: "25px", top: "300px" }} className="button">
                        본인 인증하기
                    </div>
                    <div onClick={() => { nicknamecheck(signupdata.nickname); }} style={{ position: "relative", left: "25px", top: "335px" }} className="button">
                        중복 닉네임 확인
                    </div>
                </div>
            </div>
            <button type="submit" style={{ textDecoration: "none" }} className="signupCheck">가입</button>
        </form>
    );
}

export default Signup;
