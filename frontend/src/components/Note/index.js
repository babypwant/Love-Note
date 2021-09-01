import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Note.scss';
import * as sessionActions from "../../store/notes";
import { getNotes } from '../../store/notes'
import { getUsers } from '../../store/users'
import { useHistory } from 'react-router';

//remember to make a hidden field with userId set from state
//so we can assoc. userId into our table

//Main bug to fix for tommorrow:
/*
when I refresh my sessions user information returns null, why?
works only on the first instance of loading the page
*/

function Note() {
    const sessionUser = useSelector(state => state.session.user);
    const [name, setname] = useState('')
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getUsers())
    }, [dispatch, sessionUser])

    const onSubmit = (e) => {
        e.preventDefault();
        const where = history.location.pathname;
        const params = Object.values(where)
        const arrayNums = params.slice((7))
        const stringNums = arrayNums.join('')
        const notebookId = parseInt(stringNums)
        var contenteditable = document.querySelector('[contenteditable]'),
            description = contenteditable.textContent;
        if (name.length > 0 && description.length > 0) {
            history.push(`/all/notes/${notebookId}`)
            return dispatch(sessionActions.noteCreate({ name, notebookId, description }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    console.log(errors)
                    return data;
                });
        }
        return setErrors(['A great book needs a great name']);

    };

    const allNotes = (e) => {
        e.preventDefault();
        const where = history.location.pathname;
        const params = Object.values(where)
        const arrayNums = params.slice((7))
        const stringNums = arrayNums.join('')
        const notebookId = parseInt(stringNums)
        history.push(`/all/notes/${notebookId}`)
    }

    return (
        <div className='create-note-div'>
            <div className='save-note-container'>
                <div className='pixel' onClick={onSubmit} ><p>{'Save Note =>'}</p></div>
            </div>
            <div className='view-notes-container'>
                <div className='pixel' onClick={allNotes}><p>{'<= view all notes'}</p></div>
            </div>
            <div className='note-title-div' value={name}>
                <input
                    placeholder='Title'
                    className='note-title-holder'
                    onChange={(e) => setname(e.target.value)}
                >
                </input>
            </div>
            <div class="pages" >
                <div class="page">
                    <div class="page-editable" contentEditable="true">
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Note;