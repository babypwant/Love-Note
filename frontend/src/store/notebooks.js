import { csrfFetch } from "./csrf";

const SET_NOTEBOOKS = 'users/SET_NOTEBOOKS'

const setNotebooks = (notebooks) => ({
    type: SET_NOTEBOOKS,
    notebooks
});

export const getNotebooks = () => async (dispatch) => {
    const res = await csrfFetch('/api/notebooks')
    const notebooks = await res.json();
    dispatch(setNotebooks(notebooks))
};

const initalState = {};

const notebooksReducer = (state = initalState, action) => {
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
        default:
            return state;
    }

};


export default notebooksReducer;