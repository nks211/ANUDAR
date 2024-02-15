import { React } from "react";
import "./exhibitionitem.css";

export default function ExhibitionItem(props) {
    return (
        <div className="likeexhibitionarea">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}><img width={props.width} height={props.height} src={props.exhibition.image} /></div>
                <div className="likeexhibitiontitle">{props.exhibition.name}</div>
                <div className="likeexhibitionartist">{props.exhibition.author}</div>
                <div className="likeexhibitionperiod">{props.exhibition.start_time.split("T")[0].replace(/-|-/g, ".")} ~ {props.exhibition.end_time.split("T")[0].replaceAll("-", ".")}</div>
            </div>
        </div>
    );
}