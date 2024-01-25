import { React, useState } from "react";
import "./myprofile.css";

function MyProfile(props) {

    const [url, setUrl] = useState("../../asset/profile_image.png");
    const [urlimage, setUrlImage] = useState("../../asset/profile_image.png");
    const upload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setUrl(reader.result || null);
                setUrlImage(reader.result || null);
                resolve();
            };
        });
    }

    return (
        <div className="myprofilearea">
            <div className="left">
                <img width="200px" height="200px" src={url}/>
                <label className="myprofileimage" for="profileurl">프로필 사진 수정</label>
                <input type="file" id="profileurl" accept="image/*" onChange={e => upload(e)} style={{ display: "none" }}/>
            </div>
            <div className="right">
                <div className="nickname"><b>{ props.nickname }</b> 님</div>
                <div style={{ display: "flex", flexDirection: "row", }}>
                    <div className="follower">팔로워 { props.follower }</div>
                    <div className="following">팔로잉 { props.following }</div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;