import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './EditNotebook.scss';
import * as sessionActions from "../../store/session";
import notebooksReducer, { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import fire from '../../images/campfire.png'
import { useParams } from 'react-router';
//Main bug to fix for tommorrow:

//Id is not reliable and need to go back to notebook/index.js and fix so I can
//realiably get Id's 
//Also on the home page, we need to figure out how to cause a rerender
//after we delete/edit/ or create a book

function NotebookEdit() {
    const [name, setname] = useState('')
    const [userId, setUser] = useState(0)
    const [description, setDescription] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
        }
    }, [dispatch, sessionUser])

    const onSubmit = () => {
        const notebook = notebooks.find((notebook) => notebook.id = id)
        setname(notebook.name)
        setDescription(notebook.description)
        history.push('/home')
        return dispatch(sessionActions.notebookEdit({ id, name, description }))
    }

    return (
        <div>
            <img src={fire} className='fire'></img>
            <form className='edit-form'>
                <div>
                    <input
                        type='text'
                        placeholder='Super cool new name'
                        className='form-name'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    ></input>
                </div>
                <div >
                    <input
                        type='text'
                        placeholder='         new lore?'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        className='description'
                    ></input>
                </div>
                <div class='btn-container' >
                    <div class="pixel" onClick={onSubmit}><p>Drink water</p></div>
                </div>
            </form>
        </div >

    );
}

export default NotebookEdit;