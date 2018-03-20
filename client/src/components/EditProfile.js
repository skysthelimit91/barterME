import React, { Component } from 'react';
import axios from 'axios';
import TokenService from '../services/TokenService';




export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    const picture = this.props.image

    this.state = {
      image_url: picture
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log('in EditProfile, this.state is ', this.state);
  }

  submitHandler(e) {
    const data = {
      image_url: this.state.image_url
    };
    console.log(
      data
    );
    e.preventDefault();
    axios({
      url: `/users/${this.props.id}`,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${TokenService.read()}`,
      },
      method: 'PUT',
      data
    }).then(response => {
      console.log('PUT successful, response.data:', response.data);
    });
  }


  render() {
    return (
      <div className="edit-profile-form">
        <form onSubmit={this.submitHandler}>
          <br />
          <br />
          <label>{'Enter image address here'}</label>
          <input
            className="profile-input"
            type="text"
            name="image_url"
            onChange={this.changeHandler}
            value={this.state.image_url}
          />
          <br />
          <br />
          <input className="edit-profile-submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }







}
