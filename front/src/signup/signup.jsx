import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import './signup.css';
import { mainstate } from "../StateManagement";
import { checkid, checknickname, uploadimage, signup } from "../API";

const phonenumberformatting = (number) => {
    return number.replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
};

function Signup() {

    const navigate = useNavigate();
    const { setPathName } = useContext(AppContext);

    const signupdata = mainstate(state => state.signup);
    const setidinput = mainstate(state => state.setidinput);
    const setpasswordinput = mainstate(state => state.setpasswordinput);
    const setpasswordcheckinput = mainstate(state => state.setpasswordcheckinput);
    const setnameinput = mainstate(state => state.setnameinput);
    const setnicknameinput = mainstate(state => state.setnicknameinput);
    const setnumberinput = mainstate(state => state.setnumberinput);
    const setemailinput = mainstate(state => state.setemailinput);
    const setprofileimage = mainstate(state => state.setprofileimage);
    const [preview, setPreview] = useState("../../asset/profile_image.png");
    const [idcheck, setIdCheck] = useState(false);
    const [nicknamecheck, setNicknameCheck] = useState(false);
    const [passwordcheck, setPasswordCheck] = useState(false);

    const signupcomplete = async (event) => {
        event.preventDefault();

        if (!passwordcheck) {
            alert("비밀번호를 다시 확인해 주세요.");
        }
        else {
            if (!idcheck) alert("아이디 체크를 해 주세요.");
            if (!nicknamecheck) alert("닉네임 체크를 해 주세요.");
            const signupinputdata = {
                "username": signupdata.id,
                "password": signupdata.password,
                "name": signupdata.name,
                "nickname": signupdata.nickname,
                "email": signupdata.email,
                "image": signupdata.profileimage,
                "phone": signupdata.number,
            };
            const signupjsondata = await signup(signupinputdata);
            if (signupjsondata.username === signupdata.id) {
                alert("회원가입이 완료되었습니다");
                setpasswordinput("");
                setpasswordcheckinput("");
                setnumberinput("");
                navigate("/"); window.scrollTo(0, 0);
                setPathName(window.location.pathname);
            }
            else {
                console.log("error");
            }
        }

    };

    const upload = async (e) => {
        const file = e.target.files[0];
        if (file === null) return
        const imageurl = await uploadimage(file);
        if (imageurl != "") {
            setPreview(imageurl);
            setprofileimage(imageurl);
        }
        else {
            alert("이미지를 등록할 수 없습니다.");
        }
    }

    const passcheck = () => {
        signupdata.password && signupdata.passwordcheck && signupdata.password === signupdata.passwordcheck ? setPasswordCheck(true) : setPasswordCheck(false);
    }

    useEffect(() => passcheck(), [signupdata])

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
                    <input id="id" className="line" onChange={(e) => { setidinput(e.target.value); }} required />
                    <input id="password" type="password" className="line" onChange={(e) => { setpasswordinput(e.target.value); }} required />
                    <input id="passwordcheck" type="password" className="line" onChange={(e) => { setpasswordcheckinput(e.target.value); }} required />
                    <input id="name" className="line" onChange={(e) => { setnameinput(e.target.value); }} required />
                    <input id="number" type="tel" className="line" value={signupdata.number} maxLength={13} onChange={(e) => { setnumberinput(phonenumberformatting(e.target.value)); }} required />
                    <input id="nickname" className="line" onChange={(e) => { setnicknameinput(e.target.value); }} required />
                    <input id="email" type="email" className="line" onChange={(e) => { setemailinput(e.target.value); }} required />
                </div>
                <div className="check">
                    <div onClick={async () => { const result = await checkid(signupdata.id); setIdCheck(result); signupdata.id ? (result ? alert("사용 가능한 아이디입니다") : alert("아이디가 중복됩니다")) : alert("아이디를 입력해주세요") }} style={{ position: "relative", left: "25px", top: "20px" }} className="button">
                        중복 ID 확인
                    </div>
                    <div style={{ position: "relative", top: "155px", fontSize: "11px", fontWeight: 600, }} className={passwordcheck ? "pwSame" : "pwDifferent"}>
                        {signupdata.password.length > 0 ? (passwordcheck ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다") : ""}
                    </div>
                    {/* <div onClick={() => { }} style={{ position: "relative", left: "25px", top: "300px" }} className="button">
                        본인 인증하기
                    </div> */}
                    <div onClick={async () => { const result = await checknickname(signupdata.nickname); setNicknameCheck(result); signupdata.nickname ? (result ? alert("사용 가능한 닉네임입니다") : alert("닉네임이 중복됩니다")) : alert("닉네임을 입력해주세요") }} style={{ position: "relative", left: "25px", top: "370px" }} className="button">
                        중복 닉네임 확인
                    </div>
                </div>
            </div>
            <button type="submit" style={{ textDecoration: "none" }} className="signupCheck">가입</button>
        </form>
    );
}

export default Signup;
