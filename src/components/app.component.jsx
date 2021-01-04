import React from 'react';
import createStore from '../redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './layout/wrapper.component';
import Dashboard from './dashboard/dashboard.component';
import ErrorBoundary from './error-boundary/error-boundary.component';
import { theme } from './app.styles';

const store = createStore();

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <ErrorBoundary>
          <Dashboard />
        </ErrorBoundary>
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
