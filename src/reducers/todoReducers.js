import { todoTypes } from '../constants/action.type';
import { combineReducers } from 'redux';

import LocalStorageService from '../services/LocalStorageService';

const key = 'jdn-todo-mvc-reactjs';
let todoLocalStorage = LocalStorageService.getItem(key) ? LocalStorageService.getItem(key) : [];

// const a = [{"id": 0, "title":"item 1","isComplete":true},{"id": 1, "title":"item 2","isComplete":false},{"id": 2, "title":"item 3","isComplete":false}]
// LocalStorageService.setItem(key, a)
const initialState = {
    todoItems: todoLocalStorage || [],
    statusEnums: [
        { title: 'All', status: 1 },
        { title: 'Active', status: 2 },
        { title: 'Complete', status: 3 }
    ],
    defaultStatus: 1
}

const todos = (state = initialState, action) => {
    switch (action.type) {
        case todoTypes.DELETE_TODO: {
            const newState = {
                ...state,
                todoItems: [...state.todoItems].filter(item => item.id !== action.id)
            }
            LocalStorageService.setItem(key, newState.todoItems);
            return newState;
        }
        case todoTypes.CHANGE_COMPLETE: {
            const item = action.item;
            const todoItems = state.todoItems;
            const index = state.todoItems.indexOf(item);
            const newState = {
                ...state,
                todoItems: [
                    ...todoItems.slice(0, index),
                    {
                        ...item,
                        isComplete: !item.isComplete
                    },
                    ...todoItems.slice(index + 1)
                ]
            }
            LocalStorageService.setItem(key, newState.todoItems);
            return newState;
        }
        case todoTypes.CLICK_ALL: {
            const isAllComplete = state.todoItems.every(t => t.isComplete);
            const todoTmp = [...state.todoItems];
            todoTmp.forEach(e => e.isComplete = !isAllComplete);
            const newState = {
                ...state, 
                todoItems: todoTmp
            }
            LocalStorageService.setItem(key, newState.todoItems);
            return newState;
        }
            
        case todoTypes.KEY_UP_ENTER: {
            const event = action.event;
            if (event.keyCode === 13) {
                let text = event.target.value.trim();
                if (!text || text === '') {
                    return state;
                } else {
                    const newState = {
                        ...state,
                        todoItems: [
                            {
                                id: state.todoItems.length === 0 ? 0 : state.todoItems.length,
                                title: text,
                                isComplete: false
                            },
                            ...state.todoItems
                        ]
                    }

                    LocalStorageService.setItem(key, newState.todoItems);
                    event.target.value = '';
                    return newState;
                }
            }
            return state;
        }
        case todoTypes.CLEAR_COMPLETED: {
            const newState = {
                ...state,
                todoItems: state.todoItems.filter(q => q.isComplete === false )
            }
            LocalStorageService.setItem(key, newState.todoItems);
            return newState;
        }
        case todoTypes.GET_STATUS: {
            const newState = {
                ...state,
                defaultStatus: action.status
            }
            return newState;
        }
        case todoTypes.FILTER_TODO: {
            const todoItems = state.todoItems;
            switch (action.status) {
                case 1:
                    return state 
                case 2:
                    return {
                        ...state,
                        todoItems: [...todoItems].filter(q => q.isComplete === false)
                    }
                case 3:
                    return {
                        ...state,
                        todoItems: [...todoItems].filter(q => q.isComplete === true)
                    }
                default:
                    return state 
            }
        }
        default: return state
    }
}

export default combineReducers({
    todos
})