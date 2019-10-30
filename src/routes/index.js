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

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previousRoute, setPreviousRoute] = useState("");

  useEffect(() => {
    store.subscribe(getStateFromRedux);
    AUTH.onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        previousRoute ?
          history.push(previousRoute) :
          history.push("/");
        store.dispatch(getUsers());
        store.dispatch(getAllForms());
      } else {
        setIsLogin(false);
      }
      setIsLoading(false);
    });
  }, [previousRoute])

  const getStateFromRedux = () => {
    const { reducer } = store.getState();
    setPreviousRoute(reducer.previousRoute);
  }

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
        {!isLoading ? (
          <Route path="/login" component={Login} />
        ) : (
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              Loading....
            </p>
          )}
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
                pathname: "/login",
                state: {
                  previousRoute: rest.path
                }
              }}
            />
          )
      }
    />
  );
};

export default Routes;