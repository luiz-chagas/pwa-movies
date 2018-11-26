import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducer from './reducers';

export const history = createBrowserHistory();

const store = createStore(
  reducer(history),
  {
    search: '',
    movie: {},
    moviesList: [],
    loading: false,
    error: null,
  },
  compose(
    applyMiddleware(routerMiddleware(history), reduxThunk),
    composeWithDevTools(),
  ),
);

export default store;
