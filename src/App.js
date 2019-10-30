import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { GreenColor } from './constant/colors';
import store from './redux/store/store';


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
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

