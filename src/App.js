import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { GreenColor } from './constant/colors';
import { store, persistor } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: GreenColor
    },
    secondary: {
      main: GreenColor
    },
  },
  status: {
    danger: GreenColor,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

