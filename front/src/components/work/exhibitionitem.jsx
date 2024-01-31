import { React } from "react";
import "./exhibitionitem.css";

function ExhibitionItem(props) {
    return (
        <div className="likeexhibitionarea">
            <img width={props.width} height={props.height} src={props.exhibition.url} />
            <div className="likeexhibitiontitle">{ props.exhibition.title }</div>
            <div className="likeexhibitionartist">{ props.exhibition.artist }</div>
            <div className="likeexhibitionperiod">{ props.exhibition.period }</div>
        </div>
    );
}

export default ExhibitionItem;