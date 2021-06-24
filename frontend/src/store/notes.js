import { csrfFetch } from "./csrf";

const SET_NOTES = 'session/setNote'
const REMOVE_NOTE = 'session/removeNote'


const setNotes = (notes) => ({
    type: SET_NOTES,
    notes
});

export const getNotes = () => async (dispatch) => {
    const res = await csrfFetch('/api/notes')
    const notes = await res.json();
    dispatch(setNotes(notes))
};

const removeNote = (note) => {
    return {
        type: REMOVE_NOTE,
        note
    }
}

export const noteCreate = (note) => async (dispatch) => {
    const { name, notebookId, description } = note;
    const response = await csrfFetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({
            name,
            notebookId,
            description,
        }),
    });
    const data = await response.json();
    dispatch(setNotes(data.note));
    return response;
};

export const noteDelete = (note) => async (dispatch) => {
    const { id, notebookId, description } = note;
    const response = await csrfFetch(`/api/notes/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            id,
            notebookId,
            description
        }),
    });
    const data = await response.json();
    dispatch(removeNote({ id }));
    return response;
};
export const noteEdit = (note) => async (dispatch) => {
    const { id, name, description } = note;
    const response = await csrfFetch(`/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id,
            name,
            description,
        }),
    });
    const data = await response.json();
    dispatch(setNotes(data.note));
    return response;
};

export const logoutNote = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeNote());
    return response;
}

const initalState = {};

const notesReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case SET_NOTES:
            const allnotes = {};
            action.notes.forEach((note) => {
                allnotes[note.id] = note;
            });
            return {
                ...state,
                ...allnotes
            };
        case SET_NOTES:
            newState = Object.assign({}, state);
            newState[action.notes.id] = action.notes
            return newState;
        case REMOVE_NOTE:
            newState = Object.assign({}, state);
            delete newState[action.note.id]
            return newState
        default:
            return state;
    }

};


export default notesReducer;