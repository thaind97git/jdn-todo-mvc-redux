import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    render(){
        const { todoItems, onItemClicked, onDeleteItem, defaultStatus } = this.props;
        const onToDoItemsFilter = (status) => {
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
        return(
            <div className="TodoList">
            {
                onToDoItemsFilter(defaultStatus).map((item) => {
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