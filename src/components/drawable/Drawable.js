import React from 'react'
import {
  useHistory,
} from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';

import {
  List,
  Divider,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';

import {
  useTheme,
  makeStyles,
} from '@material-ui/core/styles';

import {
  drawableItems,
  drawableItemsForMe,
} from '../../constant/helper';
import { AUTH } from '../../constant/firebase';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Drawable = props => {

  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const { open, onClick } = props;

  return (
    <SwipeableDrawer
      open={open}
      variant="temporary"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClick}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {drawableItems.map((v, i) => (
          <ListItem
            button
            key={i}
            onClick={() => history.push(v.route)}
          >
            <ListItemIcon>
              {v.icon}
            </ListItemIcon>
            <ListItemText primary={v.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {drawableItemsForMe.map((v, i) => (
          <ListItem
            button
            key={i}
            onClick={() => {
              v.route ?
                history.push(v.route) :
                AUTH.signOut()
            }}
          >
            <ListItemIcon>
              {v.icon}
            </ListItemIcon>
            <ListItemText primary={v.text} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )
}

export default Drawable;
