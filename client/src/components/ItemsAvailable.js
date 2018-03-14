import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import MessageForm from "./MessageForm";

import Moment from 'react-moment';
import 'moment-timezone';

export default class ItemsAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posting: false,
      messaging: false
    };
    this.makePost = this.makePost.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.makeMessage = this.makeMessage.bind(this);
  }

  makePost() {
    this.setState(prevState => {
      const nextState = { ...prevState, posting: !prevState.posting };
      return nextState;
    });
  }

  makeMessage(){
    this.setState(prevState => {
      const nextState = { ...prevState, messaging: !prevState.messaging };
      return nextState;
    });
  }

  renderPost(postData) {
    let userData = null;
    if (this.props.usersData) {
      userData = this.props.usersData.find(
        user => user.id === postData.user_id
      );
    } else {
      return <p>LOADING</p>;
    }

    let checkMakeMessage = null;
    if (this.state.messaging) {
      checkMakeMessage = <MessageForm userData={this.props.usersData}
      id={document.getElementById('messageme').getAttribute('data-user-id')}
       />;
    }

    return (
      <div key={postData.id}>
        <img className = "profileavy" src={userData.image_url} />
        <h2>{userData.username}</h2>
        <p>{postData.description}</p>
        <img className="postimg" src={postData.image_url} />
        <br/>
        <button id="messageme" data-user-id={userData.id} onClick={this.makeMessage}>Click here to message {userData.username} about this post</button>
        {checkMakeMessage}
      </div>
    );
  }

  render() {
    let checkMakePost = null;
    if (this.state.posting) {
      checkMakePost = <PostForm gather={this.props.gather}
       />;
    }

    let postsItems = null;
    if (this.props.gather){
      postsItems = this.props.gather.map(this.renderPost)
    }

    return (
      <div>
        <h1>Items currently available for barter!</h1>
        <button className="post-button" onClick={this.makePost}>
          Post an item of your own!
        </button>
        {checkMakePost}
        <br />
        {/*this.props.gather*/}
        {postsItems}
        <br/>


        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    );
  }
}
