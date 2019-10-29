import React, {
  useState
} from 'react';
import clsx from 'clsx';

import {
  useHistory
} from "react-router-dom";

import AppBar from '../../components/appBar/AppBar';
import ColorButton from '../../components/button/Button';

import {
  Paper,
  Grid,
  Input,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  FormHelperText,
  InputAdornment,
} from '@material-ui/core';
import {
  Send,
  Visibility,
  VisibilityOff,
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

import store from '../../redux/store/store';

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
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    width: "90%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const validate = () => {
    if (!email) {
      setEmailError("Please enter email.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email.");
      return;
    }
    if (!password) {
      setPasswordError("Please enter password.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password contains atleast 6 characters.");
      return;
    }

    AUTH.signInWithEmailAndPassword(email, password).then((res) => {
      store.dispatch({
        email,
        password,
        type: "LOGIN_USER",
        uid: res.user.uid,
      })
      // history.push("/");
    }).catch(err => {
      console.log(err, " error in dashboard login");
    })
  }

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6} justify="center">
          <Paper className={classes.paper}>
            <img
              alt="Not found!"
              className={classes.logo}
              src={require('../../images/launch-icon.png')}
            />
            <TextField
              required
              type="email"
              value={email}
              label="Email"
              margin="normal"
              id="standard-error"
              error={emailError}
              helperText={emailError}
              className={classes.textField}
              onChange={({ target }) => {
                setEmailError("");
                setEmail(target.value);
              }}
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={({ target }) => {
                  setPasswordError("");
                  setPassword(target.value)
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError && (
                <FormHelperText id="standard-weight-helper-text">
                  {passwordError}
                </FormHelperText>
              )}
            </FormControl>
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