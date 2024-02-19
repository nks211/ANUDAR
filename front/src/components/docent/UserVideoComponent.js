import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './Font.css'

export default class UserVideoComponent extends Component {

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent user={this.props.user} streamManager={this.props.streamManager} />
            {this.props.user === 'user' ? <div><p style={{
              marginTop: "5px",
              // fontFamily: '"Indie Flower", cursive', // 폰트 교체
              fontFamily: 'SUIT-Regular',
              fontWeight: 'bold' // 글자 굵게
            }}>{this.getNicknameTag()}</p></div> : null}
          </div>
        ) : null}
      </div>
    );
  }
}