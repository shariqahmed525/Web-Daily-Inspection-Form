import React, {
  useState,
  useEffect
} from 'react';

import {
  useLocation,
} from "react-router-dom";

import AppBar from '../../components/appBar/AppBar';
import ColorButton from '../../components/button/Button';

import {
  Paper,
  Grid,
} from '@material-ui/core';
import {
  Send,
} from '@material-ui/icons';
import {
  AUTH
} from '../../constant/firebase';
import {
  makeStyles
} from '@material-ui/core/styles';
import {
  validateEmail
} from '../../constant/helper';

import { store } from '../../redux/store/store';
import PasswordField from '../../components/passwordField/PasswordField';
import EmailField from '../../components/emailField/EmailField';
import { route } from '../../redux/actions/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    height: '100vh',
    display: 'flex',
    padding: "0px 10px",
  },
  paper: {
    height: 400,
    display: 'flex',
    textAlign: 'center',
    padding: "0px 30px",
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  margin: {
    margin: theme.spacing(2),
  },
  error: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    color: "#f44336",
    fontSize: "0.75rem",
    fontWeight: 400,
  }
}));

const Login = () => {
  const classes = useStyles();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    if (!email.trim()) {
      setEmailError("Please enter email.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Please enter password.");
      return;
    }
    if (password.trim().length < 6) {
      setPasswordError("Password must be greater than 5 characters.");
      return;
    }

    AUTH.signInWithEmailAndPassword(email, password).then((res) => {
      store.dispatch({
        email,
        password,
        type: "LOGIN_USER",
        uid: res.user.uid,
      })
    }).catch(err => {
      if (err.code === "auth/user-not-found") {
        setError(`There is no user found who use this email "${email}"`);
      } else if (err.code === "auth/wrong-password") {
        setError(`Wrong password`);
      }
      console.log(err, " error in dashboard login");
    })
  }

  useEffect(() => {
    store.dispatch(route(state.route));
    return () => store.dispatch(route("/"));
  }, [state.route])

  return (
    <div className={classes.root}>
      <AppBar login />
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <img
              alt="Not found!"
              className={classes.logo}
              src={require('../../images/launch-icon.png')}
            />

            <EmailField
              value={email}
              error={emailError}
              onChange={({ target }) => {
                setEmailError("");
                setEmail(target.value);
              }}
            />

            <PasswordField
              title="Password"
              value={password}
              error={passwordError}
              showPassword={showPassword}
              onChange={({ target }) => {
                setPasswordError("");
                setPassword(target.value)
              }}
              onEyeClick={() => setShowPassword(!showPassword)}
            />
            <p className={classes.error}>{error}</p>
            <ColorButton
              color="primary"
              endIcon={<Send />}
              variant="contained"
              className={classes.margin}
              onClick={() => validate()}
            >
              Login
            </ColorButton>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;