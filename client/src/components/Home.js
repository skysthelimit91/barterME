import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
    this.props.history.push('/itemsavailable');
  }
  
  render() {
    return (
      <div>
        <img id = "logopic" src="https://i.imgur.com/aKuHJP6.jpg?1" />
        <h2 className="logintext">Login here:</h2>
        <form
          className="login"
          onSubmit={this.handleSubmit}
        >
          <label>
            Username:
            <p>
              <input
                placeholder="Enter your username"
                type="text"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </p>
          </label>
          <label>
            Password:
            <p>
              <input
                placeholder="Enter your password"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </p>
          </label>
          <button className="homebtn" type="submit" value="Submit">
            Submit
          </button>
        </form>
        <br />
        <h3 className="registertext">
          Don't have an account? <Link to="/register"> Register here! </Link>{' '}
        </h3>
        <br />
      </div>
    );
  }
}
