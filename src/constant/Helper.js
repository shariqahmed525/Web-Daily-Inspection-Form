import React from 'react'

import {
  Home,
  Lock,
  People,
  ExitToApp,
  PersonAdd,
  SupervisorAccount,
} from '@material-ui/icons';
import Axios from 'axios';

export const drawableItems = [
  {
    text: "Home",
    icon: <Home />,
    route: '/'
  },
  {
    text: "New User",
    icon: <PersonAdd />,
    route: '/newuser'
  },
  {
    text: "Users",
    icon: <People />,
    route: '/users'
  },
  {
    text: "New Admin",
    icon: <PersonAdd />,
    route: '/newadmin'
  },
  {
    text: "Admins",
    icon: <SupervisorAccount />,
    route: '/admins'
  },
];

export const drawableItemsForMe = [
  {
    text: "Change Password",
    icon: <Lock />,
    route: '/changepassword'
  },
  {
    text: "Logout",
    icon: <ExitToApp />,
    route: ''
  },
];

export const validateEmail = (email) => {
  //eslint-disable-next-line
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const FIREBASE_URL = "https://us-central1-inspectionform-364ca.cloudfunctions.net";
export const DELETE_USER = "/deleteUserFromAuthentications";

export const axios = Axios.create({
  // baseURL: "http://localhost:5001/inspectionform-364ca/us-central1",
  baseURL: FIREBASE_URL,
});
