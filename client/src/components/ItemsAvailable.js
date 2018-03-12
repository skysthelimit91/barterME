
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ItemsAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posting: false
    };
    this.makePost = this.makePost.bind(this);
  }

  makePost() {
    this.setState(prevState => {
      const nextState = { ...prevState, posting: !prevState.posting };
      return nextState;
    });
  }

  render() {
    return (
      <div>
        <h1>Items currently available for barter!</h1>
        <br/>
        <h3></h3>
      <Link to="/"><button>Back Home</button></Link>     

     </div>
    )
  }
}