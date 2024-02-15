import { React } from "react";
import "./exhibitionitem.css";

export default function ExhibitionItem(props) {
    return (
        <div className="likeexhibitionarea">
            <img width={props.width} height={props.height} src={props.exhibition.image} />
            <div className="likeexhibitiontitle">{ props.exhibition.name }</div>
            <div className="likeexhibitionartist">{ props.exhibition.author }</div>
            <div className="likeexhibitionperiod">`{props.exhibition.start_time} ~ {props.exhibition.end_time}`</div>
        </div>
    );
}