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
import { store } from '../redux/store/store';

import Home from '../screens/home/Home';
import Users from "../screens/users/Users";
import Login from "../screens/login/Login";
import NewUser from "../screens/newUser/NewUser";
import Loading from '../components/loader/Loader';
import ChangePassword from "../screens/changePassword/ChangePassword";

import {
  getUsers,
  // getAllForms,
  uid,
  getUser,
} from "../redux/actions/actions";
import {
  AUTH
} from "../constant/firebase";

const history = createBrowserHistory();

const Routes = () => {

  const [route, setRoute] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStateFromRedux();
    AUTH.onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        route ?
          history.push(route) :
          history.push("/");
        store.dispatch(getUsers());
        store.dispatch(uid(user.uid));
        store.dispatch(getUser(user.uid));
      } else {
        setIsLogin(false);
      }
      setIsLoading(false);
    });
  }, [route])

  const getStateFromRedux = () => {
    const { reducer } = store.getState();
    setRoute(reducer.route);
    // store.dispatch(getAllForms());
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
          exact
          login={isLogin}
          path="/newuser"
          component={NewUser}
        />
        <PrivateRoute
          exact
          path="/users"
          login={isLogin}
          component={Users}
        />
        <PrivateRoute
          exact
          login={isLogin}
          path="/changepassword"
          component={ChangePassword}
        />
        {!isLoading ? (
          <Route path="/login" component={Login} />
        ) : (
            <Loader />
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
                  route: rest.path
                }
              }}
            />
          )
      }
    />
  );
};

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Loading
      style={{
        width: 150
      }}
    />
  </div>
)

export default Routes;