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

    };


    const onClick = () => {
        console.log(1)
    }

    return (
        <div>
            <h2>Hello</h2>
            {allNotes.map((note) => {
                { console.log(note.name) }
                return <div>
                    <h2>{note.name}</h2>
                    <button onClick={onClick}>Edit note </button>
                </div>
            })
            }
        </div>
    );
}

export default AllNotes;