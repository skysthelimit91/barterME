import React, { Component } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


export default class Profile extends Component {
    
    constructor(props) {
    super(props);
  

    this.state = {
      editing: false
    };
    this.editProfile = this.editProfile.bind(this);

  }

editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
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
    let postsItems = null;
    if (this.props.selectedUsersData){
      postsItems = this.props.selectedUsersData.map(x => {
        return (
          <div key={x.id}>
            <p>
            {x.description}
            </p>
            <img className = "profilepostimg" src={x.image_url}/>
          </div>
        );
      })
    }

    return (
      <div>
        <img className= "profpageimg" src= {this.props.image} />
        <h1>{this.props.current_user}, you can edit your avatar or posts below </h1>
        <button className="edit-profile-button" onClick={this.editProfile}>
              Edit Profile
            </button>
            {checkEditProfile}
        <br/>
        {postsItems}
      <Link to="/"><button>Back Home</button></Link>     

     </div>
    )
  }

  }