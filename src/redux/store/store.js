import thunk from "redux-thunk";
import reducer from "../reducer";
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
let persistor = persistStore(store);

export { store, persistor };