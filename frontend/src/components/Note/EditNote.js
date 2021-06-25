import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './AllNotes.scss';
import * as sessionActions from "../../store/notes";
import { getNotes } from '../../store/notes'
import { getUsers } from '../../store/users'
import { getNotebooks } from '../../store/notebooks';
import { useHistory, useParams } from 'react-router';

//remember to make a hidden field with userId set from state
//so we can assoc. userId into our table

//Main bug to fix for tommorrow:
/*
when I refresh my sessions user information returns null, why?
works only on the first instance of loading the page
*/

function EditNote() {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const notes = useSelector(state => Object.values(state.notes))
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    let noteList;
    const allNotes = notes.filter(function (note) {
        return note.notebookId === Number(id);
    })

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getUsers())
        dispatch(getNotebooks())

    }, [dispatch, sessionUser])


    const onSubmit = (e) => {
        e.preventDefault();
        const noteId = e.target.value
        console.log(noteId)
        history.push(`/all/notes/${id}`)
    };


    const onClick = (e) => {
        e.preventDefault();
        const noteId = parseInt(id)
        const note = notes.find((note) => note.id === noteId)
        const notebookId = note.notebookId
        history.push(`/all/notes/${notebookId}`)
        return dispatch(sessionActions.noteEdit({ id, name, description }))
    }

    return (
        <div>
            <h2>New name</h2>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            >
            </input>
            <h2>New content</h2>
            <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            >
            </input>
            <div>
                <button onClick={onClick}> Change lore</button>
            </div>
        </div>
    );
}

export default EditNote;