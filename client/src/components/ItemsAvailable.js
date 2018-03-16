import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import NavBar from './NavBar';

// import MessageForm from "./MessageForm";
import TokenService from "../services/TokenService";

import Moment from "react-moment";
import "moment-timezone";

export default class ItemsAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posting: false,
      messaging: false,
      sender_id: this.props.id
      // recipient_id: ''
    };
    this.makePost = this.makePost.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.makeMessage = this.makeMessage.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.hideForms = this.hideForms.bind(this)
    // this.handleClick = this.handleClick.bind(this);
  }

  makePost() {
    this.setState(prevState => {
      const nextState = { ...prevState, posting: !prevState.posting };
      return nextState;
    });
  }

  makeMessage(e) {
    // this.hideForms(e)
    this.createConversation(e);
    // this.hideForms(e)
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value
    });
  }

  handleSubmit(e) {
    const data = {
      message: {
        description: this.state.message_description,
        user_id: this.props.id
            }
      
    };
    console.log(
      'you posted this',
      data
    );
    e.preventDefault();
    axios(`http://localhost:3000/conversations/${this.state.conversation.id}/messages`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${TokenService.read()}`,
      },
      method: 'POST',
      data,

    }).then(response => {
      console.log('POST message successful, response.data:', response.data);
    });

  }


  // handleClick(event) {
  //   const key = event.target.name;
  //   const value = event.target.getAttribute('data-recipient-id');
  //   this.setState({
  //     [key]: value

  //   });
  // }

  // hideForms(e){

  //   if (e.target.getAttribute('data-postid') === document.getElementById("{postData.id}").getAttribute('data-specific-id'))
  //   {
  //     document.getElementById("{postData.id}").classList.remove('hideit')
  //   }
  // }

  createConversation(e) {
    let buttonlocale = document.getElementById("messageme");
    const data = {
      sender_id: this.state.sender_id,
      recipient_id: e.target.getAttribute("data-recipient-id")
    };
    console.log("conversation created", data);
    e.preventDefault();
    axios("http://localhost:3000/conversations", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${TokenService.read()}`
      },
      method: "POST",
      data
    }).then(response => {
      this.setState({
        conversation: response.data
      })
      console.log("POST conversation successful, response.data:", this.state.conversation)
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
      <div className="postdiv" data-postid={postData.id} id={postData.id} key={postData.id}>
        <img className="profileavy" src={userData.image_url} />
        <h2>{userData.username}</h2>
        <p>{postData.description}</p>
        <img className="postimg" src={postData.image_url} />
        <br />
        {/*<button
          data-postid={postData.id}
          id="messageme"
          className="messagebutton"
          name="recipient_id"
          data-recipient-id={userData.id}
          onClick={this.makeMessage}
        >
          Click here to message {userData.username} about this post
        </button>*/}
        <form
          data-specific-id={postData.id}
          className="hideit"
          id="{postData.id}"
          onSubmit={this.handleSubmit}
        >
          <br />
          <label>Write your message to {userData.username} here</label>
          <br />
          <textarea
            className="message-description-text-area"
            type="text"
            name="message_description"
            data-recipient-id={userData.id}
            onClick={this.makeMessage}
            onChange={this.handleChange}
          />
          <br />
          <input className="edit-button-submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }

  render() {
    let checkMakePost = null;
    if (this.state.posting) {
      checkMakePost = <PostForm gather={this.props.gather} />;
    }

    let postsItems = null;
    if (this.props.gather) {
      postsItems = this.props.gather.map(this.renderPost);
    }

    return (
      <div>
        <NavBar />
        <header>
        <h2>Items currently available for barter</h2>
        <button className="post-button" onClick={this.makePost}>
          Post an item of your own!
        </button>

        </header>
        {checkMakePost}
        <br />
        {/*this.props.gather*/}
        {postsItems}
        <br />

    
      </div>
    );
  }
}
