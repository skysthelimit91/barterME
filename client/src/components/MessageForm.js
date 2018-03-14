import React, { Component } from "react";
import axios from "axios";


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






render() {

    return (
      <div className="make-messages-form-div">
        <form onSubmit={this.handleSubmit}>
          <br />
          <label>{'Write your message to {this.props.userData.username} here'}</label>
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