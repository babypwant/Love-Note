import { csrfFetch } from "./csrf";

const SET_NOTEBOOKS = 'users/SET_NOTEBOOKS'
const SET_NOTEBOOK = 'session/setNotebook'
const REMOVE_NOTEBOOK = 'session/removeNotebook'

const setNotebooks = (notebooks) => ({
    type: SET_NOTEBOOKS,
    notebooks
});

export const getNotebooks = () => async (dispatch) => {
    const res = await csrfFetch('/api/notebooks')
    const notebooks = await res.json();
    dispatch(setNotebooks(notebooks))
};

const setNotebook = (notebook) => {
    return {
        type: SET_NOTEBOOK,
        payload: notebook,
    };
};

const removeNotebook = (notebook) => {
    return {
        type: REMOVE_NOTEBOOK,
        notebook
    }
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
    dispatch(removeNotebook({ id }));
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

export const logoutNotebook = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeNotebook());
    return response;
}

const initalState = {};

const notebooksReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case SET_NOTEBOOKS:
            const allNotebooks = {};
            action.notebooks.forEach((notebook) => {
                allNotebooks[notebook.id] = notebook;
            });
            return {
                ...state,
                ...allNotebooks
            };
        case SET_NOTEBOOK:
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload
            return newState;
        case REMOVE_NOTEBOOK:
            newState = Object.assign({}, state);
            delete newState[action.notebook.id]
            return newState
        default:
            return state;
    }

};


export default notebooksReducer;