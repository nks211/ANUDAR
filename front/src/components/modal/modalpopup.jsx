import { React } from "react";
import "./modalpopup.css";

export default function ModalPopup(props) {
    return (
        <div className="modalpopuparea">
            <div className="modalpopuptitle">{props.title}</div>
            <div className="modalpopupdetail">{props.detail}</div>
            <div className="modalpopupcontentarea">{props.content}</div>
            <div className="modalactionarea" style={{ display: "flex", justifyContent: "space-around", }}>
                <div onClick={props.okfunction} className="modalokbutton" style={{ display: props.okbutton ? "flex" : "none", justifyContent: "center", alignItems: "center" }}>{props.okbuttonlabel}</div>
                <div onClick={props.cancelfunction} className="modalcancelbutton" style={{ display: props.cancelbutton ? "flex" : "none", justifyContent: "center", alignItems: "center" }}>{props.cancelbuttonlabel}</div>
            </div>
        </div>
    );
};