import React, { Component } from "react";
import EditProfile from "./EditProfile";
import EditPost from "./EditPost";
import axios from "axios";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import TokenService from '../services/TokenService';



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

render() {
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

    return (
      <div>
        <img className= "profpageimg" src= {this.props.image} />
        <h3>{this.props.current_user}</h3>
        <button className="edit-profile-button" onClick={this.editProfile}>
              Edit avatar
            </button>
            {checkEditProfile}
        <br/>
        {postsItems}
      <Link to="/"><button>Back Home</button></Link>     

     </div>
    )
  }

  }