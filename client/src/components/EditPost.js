import React, { Component } from 'react';
import axios from 'axios';
import TokenService from '../services/TokenService';

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    const picture = this.props.image
    const id = this.props.id
    const text = this.props.description

    this.state = {
      image_url: picture,
      description: text

    };
 
   this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }


  changeHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log('in EditPost, this.state is ', this.state);
  }

  submitHandler(e) {
    const data = {
      description: this.state.description,
      image_url: this.state.image_url
    };
    console.log(
      data
    );
    e.preventDefault();
    axios({
      url: `http://localhost:3000/posts/${this.props.id}`,
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
      <div className="edit-post-form">
        <form onSubmit={this.submitHandler}>
          <br />
          <br />
          <label>{'Enter description here'}</label>
          <input
            className="post-input"
            type="text"
            name="description"
            onChange={this.changeHandler}
            value={this.state.description}
          />
          <br />
          <br />
          <label>{'Enter image address here'}</label>
          <input
            className="post-input"
            type="text"
            name="image_url"
            onChange={this.changeHandler}
            value={this.state.image_url}
          />
          <br />
          <br />
          <input className="edit-post-submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }







}
