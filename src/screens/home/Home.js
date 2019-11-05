import React, {
  useState,
  useEffect,
} from 'react';
import {
  useHistory
} from 'react-router-dom';
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
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    getStateFromStore();
    store.dispatch(route("/"));
    store.subscribe(getStateFromStore);
  }, [])

  const getStateFromStore = () => {
    const { reducer } = store.getState();
    let { admins, users } = reducer;
    setTotalUsers(users ? users.length ? users.length : 0 : 0);
    setTotalAdmins(admins ? admins.length ? admins.length : 0 : 0);
  }

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
        <AppCard name="USERS" value={totalUsers} onClick={() => history.push('/users')} />
        <AppCard name="ADMINS" value={totalAdmins} onClick={() => history.push('/admins')} />
      </div>
    </div>
  );
}

export default Home;
