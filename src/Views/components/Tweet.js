import React from "react";
import Popup from "../components/Popup";
import { connect } from "react-redux";
import { upvoteTweetAction, downvoteTweetAction } from "../../redux/actions/tweetAdapter";

//Presentation components
// Are concerned with how things look
// Use props for displaying everything
// Do not manage state at all
// Don’t emit actions, but may take callbacks that do via props

class Tweet extends React.Component {
  handleClick = event => {
    if (this.props.setCurrentTweet) {
      this.props.setCurrentTweet(this.props);
    }
  };

  render() {
    return (
      <div className="tweet-body" >

        <div className="votes">
        { !this.props.upvotes ?
          <button
            className="upvote"
            onClick={() => {
              this.props.upvoteTweet(this.props.id)
            }} style={{background:"darkseagreen"}}
          >👍🏾</button>
          :
          <button
            className="downvote"
            onClick={() => {
              this.props.downvoteTweet(this.props.id)
            }}
          >👎🏾</button>
        }
        </div>

        <div onClick={this.handleClick}>
          <div className="outer-body">
            <img src={this.props.profile_img_url} />
            <div className="body" url={this.props.url}>
              <div className="inner-body">
                <div className="name"> {this.props.user_name}</div>

                <div className="handle">@{this.props.handle}</div>
              </div>
              <div className="tweet content">{this.props.content}</div>

              <div>{this.props.entities} </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  upvoteTweet: upvoteTweetAction,
  downvoteTweet: downvoteTweetAction
};

export default connect(
  null,
  mapDispatchToProps
)(Tweet);
