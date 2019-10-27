import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from '../screens/home/Home';

const history = createBrowserHistory();

export default Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}