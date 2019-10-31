import React from 'react'
import clsx from 'clsx';

import { Menu } from '@material-ui/icons';
import { GreenColor } from '../../constant/colors';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: GreenColor,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  title: {
    textAlign: 'center',
    width: '100%',
  }
}));

const ApplicationBar = props => {
  const classes = useStyles();
  const { open, onClick, login } = props;
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {!login && <IconButton
          edge="start"
          color="inherit"
          onClick={onClick}
          aria-label="open drawer"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <Menu />
        </IconButton>}
        <Typography variant="h6" noWrap className={login && classes.title}>
          Daily Inspection Form
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default ApplicationBar;
