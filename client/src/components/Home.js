
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';


export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <NavBar />

        <div>I'm Home</div>
        <Link to="/register"><button>Register</button></Link>
        <br />
        <Link to="/login"><button>Login</button></Link>
        <Link to="/itemsavailable"><button>Items Page</button></Link>
        <Link to="/profile"><button>Profile</button></Link>  
      </div>
    )
  }
}