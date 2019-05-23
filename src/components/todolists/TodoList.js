import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    render(){
        const { onItemClicked, onDeleteItem, defaultStatus, filterTodo } = this.props;
        return(
            <div className="TodoList">
            {
                (filterTodo(defaultStatus)).map((item) => 
                    <span key={item._id}>
                        <TodoItem 
                            item={ item }
                            onItemClicked={(id_item) => onItemClicked(id_item) }
                            onDeleteItem={(id_item) => onDeleteItem(id_item) }
                        />
                    </span>
                )
            }
            </div>
        );
    }
}

export default TodoList;