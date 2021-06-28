import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './AllNotes.scss';
import * as sessionActions from "../../store/notes";
import { getNotes } from '../../store/notes'
import { getUsers } from '../../store/users'
import { getNotebooks } from '../../store/notebooks';
import { useHistory, useParams } from 'react-router';
import paper from '../../images/paper.png'

//remember to make a hidden field with userId set from state
//so we can assoc. userId into our table

//Main bug to fix for tommorrow:
/*
when I refresh my sessions user information returns null, why?
works only on the first instance of loading the page
*/

function AllNotes() {

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

    };


    const onClick = (e) => {
        e.preventDefault();
        const noteId = e.target.id
        history.push(`/edit/note/${noteId}`)
    }
    const deleteLore = (e) => {
        e.preventDefault();
        const value = e.target.id
        const noteId = Number(value)
        const note = notes.find((note) => note.id === noteId)
        return dispatch(sessionActions.noteDelete(note))
            .catch(async (res) => {
                const data = await res.json();
            });
    }

    return (
        <div className='all-notes-page'>
            <div className='moon-container'>
                <div id="moon"></div>
                <div className='paper-container'>
                    {allNotes.map((note) => {
                        return <div value={note.id}>
                            <h2 >{note.name}</h2>
                            <img src={paper} className='paper-img'></img>
                            <div className='notes-actions-btn' value={note.id}>
                                <div onClick={deleteLore} value={note.id} id={note.id} className='pixel'>Delete lore</div>
                                <div onClick={onClick} key={note.id} id={note.id} value={note.id} className='both-btn'>Edit Chapter </div>
                            </div>
                        </div>
                    })
                    }
                </div>
            </div>
        </div>
    );
}

export default AllNotes;