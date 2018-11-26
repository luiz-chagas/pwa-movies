/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducer from './reducers';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : compose;

const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), reduxThunk));

const store = createStore(
  reducer(history),
  {
    search: '',
    movie: {},
    moviesList: [],
    loading: false,
    error: null,
  },
  enhancer,
);

export default store;
