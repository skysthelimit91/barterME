import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ItemsAvailable from './components/ItemsAvailable';
import TokenService from './services/TokenService';


class App extends Component {
  // api call for creating a new user
  // note that TokenService.save with the token is called
  // may also want to setState with the user data and
  // whether or not the user is logged in
  constructor(props) {
    super(props);
    this.state = {
      postsData: []
    };
    console.log(this.state);

    this.getPosts = this.getPosts.bind(this);
   
  }

  register(data) {
    axios('http://localhost:3000/users/', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token)
    })
    .catch(err => console.log(`err: ${err}`));
  }

  // same as above except route is login
  // as above, we are saving the token locally using
  // the TokenService
  login(data) {
    axios('http://localhost:3000/users/login', {
      method: "POST",
      data
    }).then(resp => {
      TokenService.save(resp.data.token);
    })
    .catch(err => console.log(`err: ${err}`));
  }

  // calling a restricted route on the server
  // the important part is setting the Authorization header
  // with the token retrieved from the TokenService
  authClick(ev) {
    ev.preventDefault();
    axios('http://localhost:3000/bottles', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => console.log(resp))
    .catch(err => console.log(err));
  }

  // just delete the token
  logout(ev) {
    ev.preventDefault();
    TokenService.destroy();
  }

  checkLogin() {
    axios('http://localhost:3000/isLoggedIn', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(resp => console.log(resp))
    .catch(err => console.log(err));
  }

  getPosts(data){
    axios('http://localhost:3000/posts', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },
    }).then(response => {

      const stuff = response.data.map(x => {
        return (
          <div key={x.id}>
            <h2>{x.user_id}</h2>
            <p>
            {x.description}
            </p>
            <img className = "postimg" src={x.image_url}/>
          </div>
        );
      });
      this.setState({postsData: stuff});
      console.log("Posts:", this.state.postsData)
    });
  }

  componentDidMount() {
    console.log('app mounted');
    this.getPosts()
  }


  render() {
    return (
      <div>
        <div>
          Weird button: <button onClick={this.authClick.bind(this)}>Weird Button</button>
          Posts button: <button onClick={this.getPosts}>Posts Button</button>
          <p><button onClick={this.checkLogin.bind(this)}>Check If Logged In</button></p>
          <p><button onClick={this.logout.bind(this)}>Logout</button></p>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={(props) => (
                <Register {...props} submit={this.register.bind(this)} />
            )} />
          <Route exact path="/login" component={(props) => (
            <Login {...props} submit={this.login.bind(this)} />
          )} />
          <Route exact path="/itemsavailable" component={(props) => (
          <ItemsAvailable {...props} gather={this.state.postsData}/>
          )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
