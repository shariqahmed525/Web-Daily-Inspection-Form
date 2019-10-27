import React, { useEffect } from 'react';
import Routes from './routes';

import {
  getUsers,
  getAllForms,
} from "./redux/actions/actions";
import { store } from "./redux/store/store";

export default App = () => {

  useEffect(() => {
    store.dispatch(getUsers());
    store.dispatch(getAllForms());
  }, []);

  return <Routes />;
}