import React from 'react'

import {
  Home,
  Lock,
  People,
  ExitToApp,
  PersonAdd,
} from '@material-ui/icons';

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
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
