import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './EditNotes.scss';
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
    const notes = useSelector(state => Object.values(state.notes))
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const noteId = parseInt(id)
    const note = notes.find((note) => note.id === noteId)

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getNotebooks())
        dispatch(getNotes());



    }, [dispatch, sessionUser])

    const backToNotebook = (e) => {
        e.preventDefault();
        const notebookId = note.notebookId
        history.push(`/edit/notebook/${notebookId}`)
    };

    const updateNote = (e) => {
        e.preventDefault();
        const notebookId = note.notebookId
        history.push(`/all/notes/${notebookId}`)
        return dispatch(sessionActions.noteEdit({ id, name, description }))
    }

    return (
        <div className='create-note-div'>
            <div className='save-note-container'>
                <div className='pixel' onClick={updateNote} ><p>{'Update Note =>'}</p></div>
            </div>
            <div className='view-notes-container'>
                <div className='pixel' onClick={backToNotebook}><p>{'<= Back to notebook'}</p></div>
            </div>
            <div className='note-title-div' value={name}>
                <input
                    placeholder={note.name}
                    className='note-title-holder'

                    onChange={(e) => setName(e.target.value)}
                >
                </input>
            </div>
            <div className="pages" >
                <div className="page">
                    <div className="user-editable" >
                        <div className=''>
                            <textarea
                                type='textbox'
                                className='user-note-edit'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                                {`${note.description}`}
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default EditNote;