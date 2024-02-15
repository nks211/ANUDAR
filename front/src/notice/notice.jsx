import { React } from "react";

const style = {
    backgroundColor:"#ffffff",
    width: 300,
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 20px #777777",
};

export function UptoDate() {

    return (
        <div style={style}>
            최근 알림이 없습니다.
        </div>
    );

}

function Notice(props) {

    const title = {
        color: "#000000",
        fontSize: 16,
        fontWeight: 400,
    };

    const detail = {
        color: "#000000",
        fontSize: 12,
        fontWeight: 400,
    }

    return (
        <div style={style}>
            <div style={{
                backgroundColor: "#ff0000",
                borderRadius: "5px",
                height: "10px",
                width: "10px",
                position: "relative",
            }}/>
            <div style={{ position: "relative", left: "40px", top: "-20px" }}>
                <div style={title}>{ props.title }</div>
            </div>
            <div style={{ position: "relative", left: "100px", top: "-20px"}}>
                <div style={detail}>{ props.type }</div>
            </div>
            <div style={{ position: "relative", left: "-30px", top: "20px" }}>
                <div style={detail}>{ props.details }</div>
            </div>
        </div>
    );
}

export default Notice;