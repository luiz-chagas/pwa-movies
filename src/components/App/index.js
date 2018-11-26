import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';
import Shell from '../Shell';
import store, { history } from '../../store';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Shell />
    </ConnectedRouter>
  </Provider>
);

export default App;
