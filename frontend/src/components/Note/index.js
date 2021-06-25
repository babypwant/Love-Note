import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Note.scss';
import * as sessionActions from "../../store/notes";
import { getNotes } from '../../store/notes'
import { getUsers } from '../../store/users'
import { useHistory, useParams } from 'react-router';

//remember to make a hidden field with userId set from state
//so we can assoc. userId into our table

//Main bug to fix for tommorrow:
/*
when I refresh my sessions user information returns null, why?
works only on the first instance of loading the page
*/

function Note() {
    const [description, setDescription] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const [name, setname] = useState('')
    const [errors, setErrors] = useState([]);
    const notebooks = useSelector(state => Object.values(state.notebooks))
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
        if (name.length > 0 && description.length > 0) {
            history.push(`/all/notes/${notebookId}`)
            return dispatch(sessionActions.noteCreate({ name, notebookId, description }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['A great book needs a great name']);

    };


    return (
        <div className='container-div'>
            <form >
                <label>name:</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                ></input>
                <input
                    type="text"
                    className='notebook-input'
                    placeholder='awesome detailed description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </form>
            <button onClick={onSubmit}>Create the dang thing</button>
            <button>Delete the darn thing</button>
        </div>
    );
}

export default Note;