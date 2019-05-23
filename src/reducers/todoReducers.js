import { todoTypes } from '../constants/action.type';
import { combineReducers } from 'redux';

// const a = [{"id": 0, "title":"item 1","isComplete":true}]
const initialState = {
    todoItems: [],
    statusEnums: [
        { title: 'All', status: 1 },
        { title: 'Active', status: 2 },
        { title: 'Complete', status: 3 }
    ],
    defaultStatus: 1
}

const todos = (state = initialState, action) => {
    switch (action.type) {
        case todoTypes.FETCH_S: return {
            ...state,
            todoItems: action.payload.data
        }
        case todoTypes.FETCH_F: return {
            ...state,
            todoItems: action.payload.data
        }
        case todoTypes.GET_STATUS: return {
            ...state,
            defaultStatus: action.status
        }
        default: return state
    }
}

export default combineReducers({
    todos
})