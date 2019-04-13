import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    render(){
        const { onItemClicked, onDeleteItem, defaultStatus, filterTodo } = this.props;
        return(
            <div className="TodoList">
            {
                (filterTodo(defaultStatus)).map((item) => {
                    return <TodoItem 
                            key={ item.id }
                            item={ item }
                            onItemClicked={(item) => onItemClicked(item) }
                            onDeleteItem={(id_item) => onDeleteItem(id_item) }
                            />
                })
            }
            </div>
        );
    }
}

export default TodoList;