import React, {
  useState,
  useEffect
} from 'react';
import {
  useHistory
} from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animation from '../../images/animation.json';

import AppBar from '../../components/appBar/AppBar';
import ColorButton from '../../components/button/Button';

import {
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  VpnKey,
} from '@material-ui/icons';
import {
  AUTH
} from '../../constant/firebase';
import {
  makeStyles
} from '@material-ui/core/styles';


import { store } from '../../redux/store/store';
import PasswordField from '../../components/passwordField/PasswordField';
import Drawable from '../../components/drawable/Drawable';
import { route, updatePassword } from '../../redux/actions/actions.js';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    minHeight: '100vh',
    display: 'flex',
    padding: "0px 10px 0px 10px",
  },
  paper: {
    height: 400,
    marginTop: 60,
    display: 'flex',
    padding: "0px 30px",
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    boxShadow: "rgba(0,0,0,0.2) 5px 5px 5px",
  },
  margin: {
    margin: theme.spacing(2),
  },
  error: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    color: "#f44336",
    fontSize: "0.75rem",
    fontWeight: 400,
  },
  button: {
    height: 100,
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const ChangePassword = () => {
  const classes = useStyles();
  let history = useHistory();

  const [uid, setUid] = useState("")
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cPassword, setCPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCPasswordError] = useState("");

  const validate = async () => {
    if (!password.trim()) {
      setPasswordError("Please enter password.");
      return;
    }
    if (password.trim().length < 6) {
      setPasswordError("Password must be greater than 5 characters.");
      return;
    }
    if (!cPassword.trim()) {
      setCPasswordError("Please enter password.");
      return;
    }
    if (cPassword.trim().length < 6) {
      setCPasswordError("Password do not match");
      return;
    }
    if (password.trim() !== cPassword.trim()) {
      setError("Password do not match");
      return;
    }
    setLoading(true);
    try {
      const { user } = await AUTH.signInWithEmailAndPassword(userEmail, userPassword);
      try {
        await user.updatePassword(password)
        store.dispatch(updatePassword(uid, password));
        history.push('/');
      } catch (err) {
        setLoading(false);
        console.log(err, " error in change admin password");
      }
    } catch (error) {
      setLoading(false);
      console.log(error, " error in change password login");
    }
  }

  useEffect(() => {
    const { reducer } = store.getState();
    const { user, uid } = reducer;
    setUid(uid);
    setUserEmail(user.email);
    setUserPassword(user.password);
    store.dispatch(route("/changepassword"));
    return () => store.dispatch(route("/"));
  }, [])

  return (
    <div className={classes.root}>
      <AppBar
        open={open}
        onClick={() => setOpen(true)}
      />
      <Drawable
        open={open}
        onClick={() => setOpen(false)}
      />
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>

            <Typography variant="h4" color="secondary" style={{
              textAlign: 'center',
              marginTop: "0.35em",
            }}>
              Change Password
            </Typography>

            <PasswordField
              id="pass"
              title="New Password"
              value={password}
              error={passwordError}
              showPassword={showPassword}
              onChange={({ target }) => {
                setPasswordError("");
                setPassword(target.value)
              }}
              onEyeClick={() => setShowPassword(!showPassword)}
            />

            <PasswordField
              id="cpass"
              value={cPassword}
              error={cPasswordError}
              title="Confirm Password"
              showPassword={showPassword}
              onChange={({ target }) => {
                setCPasswordError("");
                setCPassword(target.value)
              }}
              onEyeClick={() => setShowPassword(!showPassword)}
            />

            <p className={classes.error}>{error}</p>
            <div className={classes.button}>
              {loading ? (
                <Lottie
                  options={{
                    animationData: animation
                  }}
                />
              ) : (
                  <ColorButton
                    color="primary"
                    endIcon={<VpnKey />}
                    variant="contained"
                    className={classes.margin}
                    onClick={() => validate()}
                  >
                    Change Password
                </ColorButton>
                )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePassword;