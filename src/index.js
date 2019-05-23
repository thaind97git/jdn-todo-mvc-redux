import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers/index';

import AppTodoContainer from './containers/AppTodo.Container';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AppTodoContainer />
  </Provider>, document.getElementById('root')
)

