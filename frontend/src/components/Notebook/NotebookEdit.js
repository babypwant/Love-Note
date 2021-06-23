import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './EditNotebook.scss';
import * as sessionActions from "../../store/session";
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import fire from '../../images/campfire.png'
//Main bug to fix for tommorrow:

//history.push is not redirecting after I submit, maybe cant be used in a func?

function NotebookEdit() {
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

    return (
        <div className='wrapper-div'>
            <form className='edit-form'>
                <div>
                    <label>Change name?</label>
                </div>
            </form>
            <img src={fire} className='fire'></img>
        </div>

    );
}

export default NotebookEdit;