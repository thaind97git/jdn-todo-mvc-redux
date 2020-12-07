import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ onItemClicked, onDeleteItem, todoItems = [] }) => {
  return (
    <div className="TodoList">
      {todoItems.map((item) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            onItemClicked={(item) => onItemClicked?.(item)}
            onDeleteItem={(todoId) => onDeleteItem?.(todoId)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
