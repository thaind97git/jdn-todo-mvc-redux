import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';

import AppTodoContainer from './containers/AppTodo.Container';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <AppTodoContainer />
  </Provider>, document.getElementById('root')
)

