import React, {
  useState
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
  PersonAdd,
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
import Drawable from '../../components/drawable/Drawable';
import { createUser, route } from '../../redux/actions/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    minHeight: '100vh',
    display: 'flex',
    padding: "0px 10px 0px 10px",
  },
  paper: {
    height: 500,
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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

const NewAdmin = () => {
  const classes = useStyles();
  let history = useHistory();

  store.dispatch(route("/newadmin"));

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cPassword, setCPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCPasswordError] = useState("");

  const validate = () => {
    const toLowerEmail = email.toLowerCase();
    if (!toLowerEmail.trim()) {
      setEmailError("Please enter email.");
      return;
    }
    if (!validateEmail(toLowerEmail)) {
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
    if (!cPassword.trim()) {
      setCPasswordError("Please enter confirm password.");
      return;
    }
    if (cPassword.trim().length < 6) {
      setCPasswordError("Password do not match");
      return;
    }
    if (password.trim() !== cPassword.trim()) {
      setCPasswordError("Password do not match");
      return;
    }
    setLoading(true);
    AUTH.createUserWithEmailAndPassword(toLowerEmail, password).then((res) => {
      history.push('/admins');
      store.dispatch(createUser(res.user.uid, toLowerEmail, password, "admin"));
    }).catch(err => {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        setError(err.message);
      }
      console.log(err, " error in new admin");
    })
  }

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
              Create New Admin
            </Typography>

            <EmailField
              value={email}
              error={emailError}
              onChange={({ target }) => {
                setEmailError("");
                setEmail(target.value);
              }}
            />

            <PasswordField
              id="pass"
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
                    endIcon={<PersonAdd />}
                    variant="contained"
                    className={classes.margin}
                    onClick={() => validate()}
                  >
                    Create
                </ColorButton>
                )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewAdmin;