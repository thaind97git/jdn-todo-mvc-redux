import { todoTypes } from '../constants/action.type';

export function deleteTodo(id) {
    return {
        type: todoTypes.DELETE_TODO,
        id: id
    }
}

export function changeComplete(item) {
    return {
        type: todoTypes.CHANGE_COMPLETE,
        item: item
    }
}

export function clickAll() {
    return {
        type: todoTypes.CLICK_ALL
    }
}

export function keyUpEnter(event) {
    return {
        type: todoTypes.KEY_UP_ENTER,
        event: event
    }
}

export function clearCompleted() {
    return {
        type: todoTypes.CLEAR_COMPLETED
    }
}

export function getStatus(status) {
    return {
        type: todoTypes.GET_STATUS,
        status: status
    }
}

export function filterTodo(status) {
    return {
        type: todoTypes.FILTER_TODO,
        status: status
    }
}