import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as todoActions from '../actions/TodoActions';
import { bindActionCreators } from 'redux';

import TodoList from '../components/todolists/TodoList';
import Header from '../components/headers/Header';
import Footer from '../components/footers/Footer';

class AppTodo extends Component {
    render() {
        const { state, actions } = this.props;
        return(
            <div className="App">
                <h1 id="App-title">Todos MVC</h1>
                <div id="App-main">
                    <Header 
                        todoItems = {state.todoItems}
                        onClickAll = {() => actions.clickAll()}
                        keyUpEnter = {(event) => actions.keyUpEnter(event)}
                    />
                    <TodoList 
                        todoItems = {state.todoItems}
                        onItemClicked = {(item) => actions.changeComplete(item)}
                        onDeleteItem = {(id_item) => actions.deleteTodo(id_item)}
                        defaultStatus = {state.defaultStatus}
                    />
                    <Footer 
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

export default connect(mapStateToProps, mapDispatchToProps) (AppTodo);