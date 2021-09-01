import { csrfFetch } from "./csrf";

const SET_NOTES = 'users/setNotes'
const REMOVE_NOTE = 'session/removeNote'
const SET_NOTE = '/session/setNote'


const setNotes = (notes) => ({
    type: SET_NOTES,
    notes
});

const setNote = (note) => {
    return {
        type: SET_NOTE,
        payload: note,
    };
};

export const getNotes = () => async (dispatch) => {
    const res = await csrfFetch('/api/notes')
    const notes = await res.json();
    dispatch(setNotes(notes))
};

const removeNote = () => {
    return {
        type: REMOVE_NOTE
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
    dispatch(setNote(data.note));
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
    console.log(data)
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
    dispatch(setNote(data.note));
    return response;
};

export const logoutNote = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeNote());
    return response;
}

const initalState = { };

const notesReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case SET_NOTES:
            const allNotes = { };
            action.notes.forEach((note) => {
                allNotes[note.id] = note;
            });
            return {
                ...state,
                ...allNotes
            };
        case SET_NOTE:
            newState = Object.assign({ }, state);
            newState[action.payload.id] = action.payload
            return newState;
        case REMOVE_NOTE:
            newState = Object.assign({ }, state);
            delete newState[action.note.id]
            return newState
        default:
            return state;
    }

};


export default notesReducer;