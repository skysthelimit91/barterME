import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
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
    this.getPostsUserData = this.getPostsUserData.bind(this);
    this.getSingleUserPosts = this.getSingleUserPosts.bind(this)
    // this.lookforusers = this.lookforusers.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this)

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

      // const stuff = response.data.map(x => {
      //   return (
      //     <div key={x.id}>
      //       <h2>{x.user_id}</h2>
      //       <p>The Thing: {JSON.stringify(x)}</p>
      //       <p>
      //       {x.description}
      //       </p>
      //       <img className = "postimg" src={x.image_url}/>
      //     </div>
      //   );
      // });
      const stuff = response.data;
      this.setState({postsData: stuff}, this.getPostsUserData);
      console.log("Posts:", this.state.postsData)
    });
  }

  getPostsUserData() {
    // lets say we have a route set up to do this in one axios request
    axios('http://localhost:3000/users', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },

    // whatever
    }).then(response => {
      // lets say response.data is an array containing the data
      // for every user we mention in our posts
      // [{name: ..., email: ... , id: ...}, ...]
      // We want to be able to look up users by id in the render method. 
      // For now the simplest way of doing this is probably to just use
      // the .find method of Javascript arrays, which actually fits this
      // shape of data, but if we wanted a more efficient method we could
      // restructure the data into a lookup table from user ids to user data.
      this.setState({usersData: response.data});
    })
  }

  // lookforusers() {
  //   axios('http://localhost:3000/users', {
  //     headers: {
  //       Authorization: `Bearer ${TokenService.read()}`,
  //     },
  //   }).then(response => console.log("users:", response.data))
  //   .catch(err => console.log(err));
  // }

  // then you want a way to actually render each post
  // let's say we're going to map this over all our post data when the time comes
  // renderPost(postData){
  //   let userData = null;
  //   if(this.state.usersData){
  //     userData = this.state.usersData.find(user => user.id === postData.user_id)
  //   } else {
  //     return (<p>LOADING</p>);
  //   }

  //   return(
  //         <div key={postData.id}>
  //           <h2>{userData.username}</h2>
  //           <p>
  //           {x.description}
  //           </p>
  //           <img className = "postimg" src={x.image_url}/>
  //         </div>
        
  //     )
  // }

  // getMyPosts(data){
  //   axios('http://localhost:3000/myposts', {
  //     headers: {
  //       Authorization: `Bearer ${TokenService.read()}`,
  //     },
  //   }).then(response => {

  //     const stuff = response.data.map(x => {
  //       return (
  //         <div key={x.id}>
  //           <h2>{x.user_id}</h2>
  //           <p>
  //           {x.description}
  //           </p>
  //           <img className = "profilepostimg" src={x.image_url}/>
  //         </div>
  //       );
  //     });
  //     this.setState({postsData: stuff});
  //     console.log("Posts:", this.state.postsData)
  //   });
  // }

    getSingleUserPosts(data) {
    // lets say we have a route set up to do this in one axios request
    axios('http://localhost:3000/myposts', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },

    // whatever
    }).then(response => {
      const singleposts = response.data
      console.log("specific posts:", singleposts)
      this.setState({selectedUsersData: singleposts});
    })
  }

  getCurrentUser(data) {
    // lets say we have a route set up to do this in one axios request
    axios('http://localhost:3000/current', {
      headers: {
        Authorization: `Bearer ${TokenService.read()}`,
      },

    // whatever
    }).then(response => {
      const current_user = response.data
      console.log("current user:", current_user)
      this.setState({current_user: current_user});
    })
  }

  componentDidMount() {
    console.log('app mounted');
    this.getPosts()
    this.getSingleUserPosts()
    // this.lookforusers()
    this.getCurrentUser()
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
          <ItemsAvailable {...props} usersData= {this.state.usersData} gather={this.state.postsData}/>
          )} />
          <Route exact path="/profile" component={(props) => (
          <Profile {...props} selectedUsersData= {this.state.selectedUsersData} current_user={this.state.current_user} />
          )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
