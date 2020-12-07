import React from "react";
import { connect } from "react-redux";
import * as todoActions from "../actions/TodoActions";
import { bindActionCreators } from "redux";

import TodoList from "../components/todolists/TodoList";
import Header from "../components/headers/Header";
import Footer from "../components/footers/Footer";
import { TODO_ACTIVE, TODO_ALL, TODO_COMPLETED } from "../enums/todoStatus";
import Git from "../images/github.png";
import Stack from "../images/stackoverflow.png";
import Linkedin from "../images/linkedin.png";
import Blog from "../images/blog.png";

const MY_INFORMATION = [
  {
    title: "Github",
    image: Git,
    link: "https://github.com/thaind97git",
  },
  {
    title: "Stackoverflow",
    image: Stack,
    link: "https://stackoverflow.com/users/11637854/judonguyen",
  },
  {
    title: "linkedin",
    image: Linkedin,
    link: "https://www.linkedin.com/in/judonguyen/",
  },
  {
    title: "Blogs",
    image: Blog,
    link: "https://dev-blogs.netlify.com/",
  },
];

const filterTodo = ({ status, todoItems = [] }) => {
  let todoItemsClone = [...todoItems];
  switch (status) {
    case TODO_ALL:
      break;
    case TODO_ACTIVE:
      todoItemsClone = todoItemsClone.filter(
        (todo) => todo.isComplete === false
      );
      break;
    case TODO_COMPLETED:
      todoItemsClone = todoItemsClone.filter(
        (todo) => todo.isComplete === true
      );
      break;
    default:
      break;
  }
  return todoItemsClone;
};
const AppTodoContainer = ({ state = {}, actions = {} }) => {
  const { defaultStatus, todoItems = [], statusEnums = {} } = state || {};
  const {
    clickAll,
    keyUpEnter,
    changeComplete,
    deleteTodo,
    getStatus,
    clearCompleted,
  } = actions || {};
  return (
    <div className="App">
      <h1 id="App-title">Todos MVC</h1>
      <div id="App-main">
        <Header
          onClickAll={() => clickAll?.()}
          keyUpEnter={(event) => keyUpEnter?.(event)}
          filterTodo={(status) => filterTodo({ status, todoItems })}
          defaultStatus={defaultStatus}
        />
        <TodoList
          todoItems={filterTodo({ status: defaultStatus, todoItems })}
          onItemClicked={(item) => changeComplete?.(item)}
          onDeleteItem={(todoId) => deleteTodo?.(todoId)}
        />
        <Footer
          filterTodo={(status) => filterTodo({ status, todoItems })}
          todoItems={todoItems}
          defaultStatus={defaultStatus}
          statusEnums={statusEnums}
          onGetStatus={(status) => getStatus?.(status)}
          onClearCompleted={() => clearCompleted?.()}
        />
      </div>
      <div>
        <span style={{ textDecoration: "none", color: "#f77f7f" }}>
          Created by thaind97
        </span>
      </div>
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        {MY_INFORMATION.map((info) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#f77f7f",
              margin: 8,
              opacity: 0.8,
            }}
            href={info.link}
          >
            <img alt={info.title} src={info.image} height={22} />
          </a>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state: state.todoReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(todoActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTodoContainer);
