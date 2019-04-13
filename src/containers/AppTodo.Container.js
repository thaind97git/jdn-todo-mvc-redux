import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as todoActions from '../actions/TodoActions';
import { bindActionCreators } from 'redux';

import TodoList from '../components/todolists/TodoList';
import Header from '../components/headers/Header';
import Footer from '../components/footers/Footer';

class AppTodoContainer extends Component {
    filterTodo = (status) => {
        const todoItems = this.props.state.todoItems;
        switch (status) {
            case 1:
                return [...todoItems]
            case 2:
                return [...todoItems].filter(q => q.isComplete === false);
            case 3:
                return [...todoItems].filter(q => q.isComplete === true);
            default:
                return [...todoItems]
        }
    }
    render() {
        const { state, actions } = this.props;
        return(
            <div className="App">
                <h1 id="App-title">Todos MVC</h1>
                <div id="App-main">
                    <Header 
                        onClickAll = {() => actions.clickAll()}
                        keyUpEnter = {(event) => actions.keyUpEnter(event)}
                        filterTodo = {(status) => this.filterTodo(status)}
                        defaultStatus = {state.defaultStatus}
                    />
                    <TodoList 
                        onItemClicked = {(item) => actions.changeComplete(item)}
                        onDeleteItem = {(id_item) => actions.deleteTodo(id_item)}
                        filterTodo = {(status) => this.filterTodo(status)}
                        defaultStatus = {state.defaultStatus}
                    />
                    <Footer 
                        filterTodo = {(status) => this.filterTodo(status)}
                        todoItems = {state.todoItems}
                        defaultStatus = {state.defaultStatus}
                        statusEnums = {state.statusEnums}
                        onGetStatus = {(status) => actions.getStatus(status)}
                        onClearCompleted = {() => actions.clearCompleted()}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state.todoReducer.todos
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AppTodoContainer);