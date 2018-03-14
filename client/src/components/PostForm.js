import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";import TokenService from '../services/TokenService';
import Moment from 'react-moment';
import 'moment-timezone';



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

  handleSubmit(e) {
    const data = {
      post: {
        description: this.state.description,
      image_url: this.state.image_url
    }
      
    };
    console.log(
      'you posted this',
      data
    );
    e.preventDefault();
    axios('http://localhost:3000/posts', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${TokenService.read()}`,
      },
      method: 'POST',
      data
    }).then(response => {
      console.log('POST successful, response.data:', response.data);
    });
  }


  // componentDidMount() {
  //   this.props.refresh()
  // }



render() {

    return (
      <div className="make-posts-form-div">
        <form onSubmit={this.handleSubmit}>
          <br />
          <label>{'Write a description of your item here'}</label>
          <br />
          <textarea
            className="post-description-text-area"
            type="text"
            name="description"
            onChange={this.handleChange}
          />
          <br />
          <label>{'Enter image address for your post picture here'}</label>
          <br />
          <input type= "file"  />
          <br />
          <input
            className="post-input"
            type="text"
            name="image_url"
            onChange={this.handleChange}
          />
          <br />
          <input className="edit-button-submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}