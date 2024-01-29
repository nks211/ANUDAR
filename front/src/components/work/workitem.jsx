import { React } from "react";
import "./workitem.css";

function WorkItem(props) {
    return (
        <div className="likeworkarea">
            <img width="250px" height="250px" src={props.work.url} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", }}><div className="likeworkname">{ props.work.title }</div><div className="likeworkartist">{ props.work.artist }</div></div>
        </div>
    );
}

export default WorkItem;