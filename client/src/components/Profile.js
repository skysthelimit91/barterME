import React, { Component } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";


export default class Profile extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.editProfile = this.editProfile.bind(this);
  }