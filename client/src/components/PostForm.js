import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TokenService from '../services/TokenService';




export default class PostForm extends Component {
   constructor(props) {
    super(props);
    this.state = {
      description: '',
      image_url: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

}

handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/posts';
    const data = {
      post: {
        description: this.state.description,
        image_url: this.state.image_url
      }
    };

    fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${TokenService.read()}`,
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log('Successfully created new post!', data));
  }


render() {
    return (
      <div className="make-posts-form-div">
        <form onSubmit={this.submitHandler}>
          <br />
          <label>{'Write a description of your item here'}</label>
          <br />
          <textarea
            className="post-description-text-area"
            type="text"
            name="description"
            onChange={this.changeHandler}
          />
          <br />
          <label>{'Enter image address for your post picture here'}</label>
          <br />
          <br />
          <input
            className="post-input"
            type="text"
            name="image_url"
            onChange={this.changeHandler}
          />
          <br />
          <input className="edit-button-submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}