import { todoTypes } from "../constants/action.type";
import LocalStorageService from "../services/LocalStorageService";
import { TODO_ACTIVE, TODO_ALL, TODO_COMPLETED } from "../enums/todoStatus";

const key = "jdn-todo-mvc-redux";
let todoLocalStorage = LocalStorageService.getItem(key) || [];

const initialState = {
  todoItems: todoLocalStorage || [],
  statusEnums: [
    { title: "All", status: TODO_ALL },
    { title: "Active", status: TODO_ACTIVE },
    { title: "Complete", status: TODO_COMPLETED },
  ],
  defaultStatus: TODO_ALL,
};

export default (state = initialState, action) => {
  const { type, payload = {} } = action || {};
  const { id, status, event = {}, item = {} } = payload;
  switch (type) {
    case todoTypes.DELETE_TODO: {
      const newState = {
        ...state,
        todoItems: [...state.todoItems].filter((item) => item.id !== id),
      };
      LocalStorageService.setItem(key, newState.todoItems);
      return newState;
    }
    case todoTypes.CHANGE_COMPLETE: {
      const todoItems = state.todoItems;
      const index = state.todoItems.indexOf(item);
      const newState = {
        ...state,
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !item.isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      };
      LocalStorageService.setItem(key, newState.todoItems);
      return newState;
    }
    case todoTypes.CLICK_ALL: {
      const isAllComplete = state.todoItems.every((t) => t.isComplete);
      const todoTmp = [...state.todoItems];
      todoTmp.forEach((e) => (e.isComplete = !isAllComplete));
      const newState = {
        ...state,
        todoItems: todoTmp,
      };
      LocalStorageService.setItem(key, newState.todoItems);
      return newState;
    }

    case todoTypes.KEY_UP_ENTER: {
      if (event.keyCode === 13) {
        let text = event.target.value.trim();
        if (!text || text === "") {
          return state;
        } else {
          const newState = {
            ...state,
            todoItems: [
              {
                id: state.todoItems?.length || 0,
                title: text,
                isComplete: false,
              },
              ...state.todoItems,
            ],
          };

          LocalStorageService.setItem(key, newState.todoItems);
          event.target.value = "";
          return newState;
        }
      }
      return state;
    }
    case todoTypes.CLEAR_COMPLETED: {
      const newState = {
        ...state,
        todoItems: state.todoItems.filter((q) => q.isComplete === false),
      };
      LocalStorageService.setItem(key, newState.todoItems);
      return newState;
    }
    case todoTypes.GET_STATUS: {
      const newState = {
        ...state,
        defaultStatus: status,
      };
      return newState;
    }
    case todoTypes.FILTER_TODO: {
      let todoItems = [...state.todoItems];
      switch (status) {
        case 1:
          break;
        case 2:
          todoItems = todoItems.filter((q) => q.isComplete === false);
          break;
        case 3:
          todoItems = todoItems.filter((q) => q.isComplete === true);
          break;
        default:
          return state;
      }
      return todoItems;
    }
    default:
      return state;
  }
};
