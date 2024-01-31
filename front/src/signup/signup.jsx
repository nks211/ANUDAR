import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './signup.css';

function Signup() {

    const navigate = useNavigate();
    
    const [profile, setProfile] = useState("../../asset/profile_image.png");
    const [preview, setPreview] = useState("../../asset/profile_image.png");
    const [password, setPassword] = useState("");
    const [Password, setPPasword] = useState("");
    const [passwordcheck, setPasswordCheck] = useState(false);

    const upload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setPreview(reader.result || null);
                setProfile(reader.result || null);
                resolve();
            };
        });
    }

    const passcheck = () => {
        password === Password? setPasswordCheck(true) : setPasswordCheck(false);
    }

    useEffect(() => passcheck())
    
    return (
        <div className="signupArea">
            <div className="signupTitle">회원가입</div>
            <img id="profile" className="signupImage" src={preview} />
            <label className="signupProfile" for="imagefile" >프로필 파일 등록...</label>
            <input type="file" id="imagefile" accept="image/*" onChange={e => upload(e)} style={{ display: "none" }}/>
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
                    <input id="id" className="line" />
                    <input id="password" type="password" className="line" onChange={(e) => { setPassword(e.target.value); }}/>
                    <input id="passwordcheck" type="password" className="line" onChange={(e) => {setPPasword(e.target.value);}}/>
                    <input id="name" className="line" />
                    <input id="number" className="line" />
                    <input id="nickname" className="line" />
                    <input id="email" className="line" />
                </div>
                <div className="check">
                    <div onClick={() => {  }} style={{ position: "relative", left: "25px", top: "20px" }} className="button">
                        중복 ID 확인
                    </div>
                    <div style={{ position: "relative", top: "155px", fontSize: "11px", fontWeight: 600, }} className={ passwordcheck? "pwSame" : "pwDifferent" }>
                        { password.length > 0? ( passwordcheck? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다") : "" }
                    </div>
                    <div onClick={() => {  }} style={{ position: "relative", left: "25px", top: "305px" }} className="button">
                        본인 인증하기
                    </div>
                    <div onClick={() => {  }} style={{ position: "relative", left: "25px", top: "345px" }} className="button">
                        중복 닉네임 확인
                    </div>
                </div>
            </div>
            <button style={{ textDecoration: "none" }} className="signupCheck" onClick={() => { navigate("/"); window.scrollTo(0, 0); }}>가입</button>
        </div>
    );
}

export default Signup;
