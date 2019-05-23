import { todoTypes } from '../constants/action.type';
import axios from 'axios';
import { toast } from 'react-toastify';
toast.configure()

const IP = "http://localhost:3001";

function configToastError() {
    return toast.error('Something wrong !', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

function configToastSuccess() {
    return toast.success('Success !', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

/**
 * Call API to fetch data from Server 
 */
export const fetchTodo = () => async (dispatch) => {

    await axios.get(`${IP}/todo/todos`).then((rs) => {
        dispatch(fectSuccess(rs.data.data))
    }).catch((er) => {
        dispatch(fectFail())
    })
}

const fectSuccess = (data) => {
    return {
        type: todoTypes.FETCH_S,
        payload: {
            data: data
        }
    }
}
const fectFail = () => {
    return {
        type: todoTypes.FETCH_S,
        payload: {
            data: []
        }
    }
}


export const deleteTodo = (id) => async (dispatch) => {
    axios.delete(`${IP}/todo/dO/` + id).then((rs) => {
        configToastSuccess();
        dispatch(fetchTodo());
    }).catch((err) => {
        configToastError()
    })
}

export const changeComplete = (id) => async (dispatch) => {
    axios.put(`${IP}/todo/uO/${id}`, null).then((rs) => {
        dispatch(fetchTodo());
    }).catch((err) => {
        configToastError()
    })
}

/**
 * Call Api to update multi isCompleted
 * @param {Boolean} isAllCompleted 
 */
export const clickAll = (isAllComplete) => async (dispatch) => {
    axios.put(`${IP}/todo/uM`, { isComplete: !isAllComplete }).then((rs) => {
        dispatch(fetchTodo())
    }).catch((err) => {
        configToastError()
    })
}

/**
 * Call API to add new one todo
 * @param {event} event 
 */

export const keyUpEnter = (event) => async (dispatch) => {

    if (event.keyCode === 13) {
        let text = event.target.value.trim();
        if (text || text !== '') {
            event.target.value = '';
            await axios.post(`${IP}/todo/create`, { title: text }).then((rs) => {
                configToastSuccess();
                dispatch(fetchTodo())
            }).catch((err) => {
                configToastError();
            })
        } else {
            return false;
        }
    } else {
        return false;
    }
}


/**
 * Call API to delete all Complete
 */
export const clearCompleted = () => async (dispatch) => {
    try {
        await axios.delete(`${IP}/todo/clearC`)
    } catch (error) {
        configToastError();
        return false;
    }
    configToastSuccess();
    dispatch(fetchTodo())
    return true;
}

export function getStatus(status) {
    return {
        type: todoTypes.GET_STATUS,
        status: status
    }
}