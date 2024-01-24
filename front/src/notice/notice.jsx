import { React, useState } from "react";

function Notice(props) {

    const style = {
        backgroundColor:"#ffffff",
        width: 300,
        height: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 20px #777777",
    };

    const title = {
        color: "#000000",
        fontFamily: "Inter-Regular",
        fontSize: 16,
        fontWeight: 400,
    };

    const detail = {
        color: "#000000",
        fontFamily: "Inter-Regular",
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
                position: "absolute",
                left: "30px",
                top: "40px",
            }}/>
            <div style={{ position: "absolute", left: "76px", top: "16px" }}>
                <div style={title}>{ props.title }</div>
            </div>
            <div style={{ position: "absolute", left: "150px", top: "19px"}}>
                <div style={detail}>{ props.date }</div>
            </div>
            <div style={{ position: "absolute", left: "76px", top: "53px" }}>
                <div style={detail}>{ props.details }</div>
            </div>
        </div>
    );
}

export default Notice;