import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Note.css';
import { getNotes } from '../../store/notes'
import { getUsers } from '../../store/users'

//remember to make a hidden field with userId set from state
//so we can assoc. userId into our table

//Main bug to fix for tommorrow:
/*
when I refresh my sessions user information returns null, why?
works only on the first instance of loading the page
*/

function Note() {
    const [note, setNote] = useState({})
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getNotes());
        dispatch(getUsers())
        console.log(sessionUser)
    }, [dispatch, sessionUser])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(1)
    };


    return (
        <div>
            <form onSubmit={onsubmit}>
                <label>Note Name</label>
                <div>
                    <input
                        type="text"
                        className='notebook-input'
                        onChange={(e) => setNote(e.target.value)}
                        required
                    />
                </div>
                <button> Create a new chapter !</button>
                <button> Edit note button </button>
            </form>
        </div>
    );
}

export default Note;