import React, { Component } from "react";
import EditProfile from "./EditProfile";
import EditPost from "./EditPost";
import axios from "axios";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import TokenService from '../services/TokenService';
import NavBar from './NavBar';
const conversationHelper = require ("../services/ConversationHelper.js")




export default class Profile extends Component {
    
    constructor(props) {
    super(props);
  

    this.state = {
      editing: false,
      editingPost: false
    };
    this.editProfile = this.editProfile.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.renderMessage = this.renderMessage.bind(this);

  }

editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  editPost() {
    this.setState(prevState => {
      const nextState = { ...prevState, editingPost: !prevState.editingPost };
      return nextState;
    });
  }


deletePost(e){
    e.preventDefault();
    const correctid = e.target.getAttribute('data-post');
    axios({
      url: `http://localhost:3000/posts/${correctid}`,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${TokenService.read()}`,
      },
      method: 'Delete'
    }).then(response => {
      console.log('Delete successful');
    });


}

renderMessage(messageData){
let convosData = null;
    if (this.props.convosData) {
      convosData = this.props.convosData.find(
        conversation => conversation.id === messageData.conversation_id
      );
    } else {
      return <p>LOADING</p>;
    }
     return (
      <div className="messagediv">
        <h3>{messageData.description}</h3>
      </div>
    );
}

render() {

  let messagesItems = null;
    if (this.props.messagesData) {
      messagesItems = this.props.messagesData.map(this.renderMessage);
    }


    let checkEditProfile = null;
    if (this.state.editing) {
      checkEditProfile = (
        <EditProfile
          image={this.props.image}
          id={this.props.id}
        />
      );
    }
    let checkEditPost = null;
    if (this.state.editingPost) {
      checkEditPost = (
        <EditPost
          image={this.props.selectedUsersData.image_url}
          id={document.getElementById('postedit').getAttribute('data-post-edit')}
          description={this.props.selectedUsersData.description}
        />
      );
    }
    let postsItems = null;
    if (this.props.selectedUsersData){
      postsItems = this.props.selectedUsersData.map(x => {
        return (
          <div key={x.id}>
            <p>
            {x.description}
            </p>
            <img className = "profilepostimg" src={x.image_url}/>
            <button onClick={this.deletePost} data-post={x.id}>Delete Post</button>
            <button id="postedit" onClick={this.editPost} data-post-edit={x.id}>Edit Post</button>
            {checkEditPost}
          </div>
        );
      })
    }

   //  let convoItems = null;
   //    if (this.props.convosData){
        
   //   convoItems = this.props.convosData.map(x => {
   //    if (x.sender_id === this.props.id || x.recipient_id === this.props.id){
   //    return (
   //      <div key={x.id}>
   //      <p>
   //      {x.id}
   //      </p>
   //      </div>
   //      )

   //   }
   // })
   // }
   

        
    
    

    return (
      <div>
        <NavBar />
        <img className= "profpageimg" src= {this.props.image} />
      {/*<img id = "profilelogo" src="https://i.imgur.com/aKuHJP6.jpg?1" />*/}
        <h3>{this.props.current_user}</h3>
        <button className="edit-profile-button" onClick={this.editProfile}>
              Edit avatar
            </button>
            {checkEditProfile}
        <br/>
        {postsItems}
        {/*convoItems*/} 
        {messagesItems}
     </div>
    )
  }

  }