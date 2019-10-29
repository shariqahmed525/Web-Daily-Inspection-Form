import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { GreenColor } from './constant/colors';


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
    danger: 'orange',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;

