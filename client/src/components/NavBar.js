import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/TokenService';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    TokenService.destroy();
    this.props.history.push('/');
  }

  render() {
    return (
        <div>
          <h2>
          <nav className="navbar">
            <Link to="/">Home </Link>
            <Link to="/profile">Profile </Link>
            <Link onClick={this.logout} to="/">
              Logout
            </Link>
          </nav>
          </h2>
        </div>
    );
  }
}

export default NavBar;
