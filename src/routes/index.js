import React, {
  useState,
  useEffect
} from "react";
import {
  Route,
  Switch,
  Router,
  Redirect,
} from "react-router-dom";
import {
  createBrowserHistory
} from "history";

import Home from '../screens/home/Home';
import store from '../redux/store/store';
import Users from "../screens/users/Users";
import Login from "../screens/login/Login";
import NewUser from "../screens/newUser/NewUser";
import ChangePassword from "../screens/changePassword/ChangePassword";

import {
  getUsers,
  getAllForms,
} from "../redux/actions/actions";
import {
  AUTH
} from "../constant/firebase";

const history = createBrowserHistory();

const Routes = () => {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    AUTH.onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        history.push("/");
        store.dispatch(getUsers());
        store.dispatch(getAllForms());
      } else {
        setIsLogin(false);
      }
    });
  }, [])

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          login={isLogin}
          component={Home}
        />
        <PrivateRoute
          login={isLogin}
          path="/newuser"
          component={NewUser}
        />
        <PrivateRoute
          path="/users"
          login={isLogin}
          component={Users}
        />
        <PrivateRoute
          login={isLogin}
          path="/changepassword"
          component={ChangePassword}
        />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
};

const PrivateRoute = ({ component: Component, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        login ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
      }
    />
  );
};

export default Routes;