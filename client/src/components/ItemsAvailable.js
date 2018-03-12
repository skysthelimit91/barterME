
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';


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
    let checkMakePost = null;
    if (this.state.posting) {
      checkMakePost = (
        <PostForm
        />
      );
    }
    return (
      <div>
        <h1>Items currently available for barter!</h1>
        <button className="post-button" onClick={this.makePost}>
              Post an item of your own!
            </button>
            {checkMakePost}
        <br/>
        <h3>{this.props.gather}</h3>
      <Link to="/"><button>Back Home</button></Link>     

     </div>
    )
  }
}