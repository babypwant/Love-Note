import { csrfFetch } from './csrf';
import notebooksReducer from './notebooks';

const SET_USER = 'session/setUser';
const SET_NOTEBOOK = 'session/setNotebook'
const REMOVE_USER = 'session/removeUser';
const REMOVE_NOTEBOOK = 'session/removeNotebook'

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

const setNotebook = (notebook) => {
    return {
        type: SET_NOTEBOOK,
        payload: notebook,
    };
};

const removeNotebook = () => {
    return {
        type: REMOVE_NOTEBOOK
    }
}


/*
USER ACTIONS
*/
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

/*
NOTEBOOK ACTIONS
*/

export const logoutNotebook = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeNotebook());
    return response;
}

export const notebookCreate = (notebook) => async (dispatch) => {
    const { name, userId, description } = notebook;
    const response = await csrfFetch("/api/notebooks", {
        method: "POST",
        body: JSON.stringify({
            name,
            userId,
            description,
        }),
    });
    const data = await response.json();
    dispatch(setNotebook(data.notebook));
    return response;
};

export const notebookDelete = (notebook) => async (dispatch) => {
    const { id, description, userId } = notebook;
    const response = await csrfFetch(`/api/notebooks/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            id,
            description,
            userId
        }),
    });
    const data = await response.json();
    dispatch(setNotebook(data.notebook));
    return response;
};
export const notebookEdit = (notebook) => async (dispatch) => {
    const { id, name, description } = notebook;
    const response = await csrfFetch(`/api/notebooks/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id,
            name,
            description,
        }),
    });
    const data = await response.json();
    dispatch(setNotebook(data.notebook));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case SET_NOTEBOOK:
            newState = Object.assign({}, state);
            newState.notebooks = action.payload
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;