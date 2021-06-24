import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Notebook.css';
import * as sessionActions from "../../store/notebooks";
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'

//Main bug to fix for tommorrow:

//history.push is not redirecting after I submit, maybe cant be used in a func?

function Notebook() {
    const [name, setname] = useState('')
    const [userId, setUser] = useState(0)
    const [description, setDescription] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();


    let notebookList;
    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
        }
    }, [dispatch, sessionUser])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length > 0) {
            setErrors([]);
            history.push('/home')
            return dispatch(sessionActions.notebookCreate({ name, userId, description }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['A great book needs a great name']);
    };

    if (notebooks) {
        notebookList = (
            <form onSubmit={handleSubmit}>
                <div className='Errors'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <label>Notebook Name</label>
                <div className='input-div'>
                    <input
                        type="text"
                        className='notebook-input'
                        placeholder='cool notebook name'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                    />
                </div>
                <div className='input-div'>
                    <input
                        type="text"
                        className='notebook-input'
                        placeholder='awesome detailed description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='btn-div'>
                    <button>| Create |</button>
                </div>

            </form>
        );
    } else {
        return true
    }



    return (
        <div>
            {notebookList}
            <div>
                <button>| Delete |</button>
            </div>
        </div>

    );
}

export default Notebook;