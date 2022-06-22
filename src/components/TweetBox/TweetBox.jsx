import * as React from "react";
import TweetInput from "./TweetInput";
import "./TweetBox.css";

export default function TweetBox({
  tweets,
  setTweets,
  userProfile,
  tweetText,
  setTweetText,
}) {
  function handleOnTweetTextChange(event) {
    setTweetText(event.target.value);
  }
  function handleOnSubmit() {
    const newTweet = {
      name: userProfile.name,
      handle: userProfile.handle,
      text: tweetText,
      comments: 0,
      retweets: 0,
      likes: 0,
      id: tweets.length,
    };

    setTweets(tweets.concat(newTweet));
    setTweetText("");
  }
  let tweetLen = tweetText.length;
  let disabled = false;
  return (
    <div className="tweet-box">
      <TweetInput
        tweets={tweets}
        value={tweetText}
        handleOnChange={handleOnTweetTextChange}
      />
      {/* <TweetBox tweets={tweets} setTweets={setTweets} userProfile={userProfile} /> */}
      <div className="tweet-box-footer">
        <TweetBoxIcons />
        <TweetCharacterCount tweetLen={tweetLen} disabled={disabled} />
        <TweetSubmitButton
          handleOnSubmit={handleOnSubmit}
          disable={disabled}
          tweetLen={tweetLen}
        />
      </div>
    </div>
  );
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  );
}

export function TweetCharacterCount({ tweetLen, disabled }) {
  let color = "black";
  if (tweetLen > 140) {
    color = "red";
    disabled = true;
  } else {
    color = "black";
  }

  if (tweetLen != 0) {
    return <span color={color}>{140 - tweetLen}</span>;
  } else {
    disabled = true;
    return <span></span>;
  }
}

export function TweetSubmitButton({ handleOnSubmit, tweetLen }) {
  let isDisabled = false;
  if (tweetLen === 0 || tweetLen > 140) {
    isDisabled = true;
  }
  return (
    <div className="tweet-submit">
      <i className="fas fa-plus-circle"></i>
      <button
        className="tweet-submit-button"
        disabled={isDisabled}
        onClick={handleOnSubmit}
      >
        Tweet
      </button>
    </div>
  );
}
