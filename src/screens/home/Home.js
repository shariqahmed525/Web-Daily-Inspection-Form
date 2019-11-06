import React, {
  useState,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../../components/appBar/AppBar';
import Drawable from '../../components/drawable/Drawable';
import { route } from '../../redux/actions/actions';
import { store } from '../../redux/store/store';
import {
  CssBaseline,
} from '@material-ui/core';
import AppCard from '../../components/card/Card';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    display: 'flex',
    minHeight: '100vh',
    padding: "100px 20px 20px 20px",
  },
  paper: {
    width: "100%",
    display: 'flex',
    flexWrap: "wrap",
    padding: "0px 30px",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  store.dispatch(route("/"));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        open={open}
        onClick={() => setOpen(true)}
      />
      <Drawable
        open={open}
        onClick={() => setOpen(false)}
      />
      <div className={classes.paper}>
        <AppCard name="USERS" value="87" onClick={() => { alert("OK") }} />
        <AppCard name="ADMINS" value="20" onClick={() => { alert("OK") }} />
      </div>
    </div>
  );
}

export default Home;
