import React, { Component } from "react";
import axios from "axios";
import TokenService from '../services/TokenService';


export default class MessageForm extends Component {
   constructor(props) {
    super(props);
    this.state = {
      description: ''
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
      message: {
        description: this.state.description
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
      data,

    }).then(response => {
      console.log('POST successful, response.data:', response.data);
    });

  }




render() {

    return (
      <div className="make-messages-form-div">
        <form onSubmit={this.handleSubmit}>
          <br />
          <label>{'Write your message to: here'}</label>
          <br />
          <textarea
            className="message-description-text-area"
            type="text"
            name="description"
            onChange={this.handleChange}
          />
          <br />
          <input className="edit-button-submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}