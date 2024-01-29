import { React } from "react";
import "./exhibitionitem.css";

function ExhibitionItem(props) {
    return (
        <div className="likeexhibitionarea">
            <img width="270px" height="360px" src={props.exhibition.url} />
            <div className="likeexhibitiontitle">{ props.exhibition.title }</div>
            <div className="likeexhibitionartist">{ props.exhibition.artist }</div>
            <div className="likeexhibitionperiod">{ props.exhibition.period }</div>
        </div>
    );
}

export default ExhibitionItem;