import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';

import AppTodo from './containers/AppTodo';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <AppTodo />
  </Provider>, document.getElementById('root')
)

