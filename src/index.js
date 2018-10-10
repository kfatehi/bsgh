import React from 'react';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

import Search from './containers/Search'

import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

// I was going to add routing too, but looks like react-router was completely rewritten in v4
// rather than learn the new version or use an old version, I am limiting scope to only:
// * refactor current design to unidirectional flow with redux
render(
  <Provider store={store}>
    <Search />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
