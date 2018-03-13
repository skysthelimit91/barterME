import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";

export default class ItemsAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posting: false
    };
    this.makePost = this.makePost.bind(this);
    this.renderPost = this.renderPost.bind(this);
  }

  makePost() {
    this.setState(prevState => {
      const nextState = { ...prevState, posting: !prevState.posting };
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

    return (
      <div key={postData.id}>
        <h2>{userData.username}</h2>
        <p>{postData.description}</p>
        <img className="postimg" src={postData.image_url} />
      </div>
    );
  }

  render() {
    let checkMakePost = null;
    if (this.state.posting) {
      checkMakePost = <PostForm />;
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
        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    );
  }
}
