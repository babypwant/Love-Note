import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './EditNotebook.scss';
import * as sessionActions from "../../store/notebooks";
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router';
import { getNotes } from '../../store/notes';
import paper from '../../images/paper.png'


function NotebookEdit() {
    const [name, setname] = useState('')
    const [userId, setUser] = useState(0)
    const [description, setDescription] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const notes = useSelector(state => Object.values(state.notes))
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()
    const allNotes = notes.filter(function (note) {
        console.log(id)
        return note.notebookId === Number(id);
    })

    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
            console.log(userId)
        }
        dispatch(getNotes());
    }, [dispatch, sessionUser, userId])

    const onSubmit = () => {
        const notebook = notebooks.find((notebook) => notebook.id = id)
        setname(notebook.name)
        setDescription(notebook.description)
        history.push('/home')
        return dispatch(sessionActions.notebookEdit({ id, name, description }))
    }
    const newNote = (e) => {
        e.preventDefault();
        history.push(`/notes/${id}`)
    }

    const library = (e) => {
        e.preventDefault();
        history.push('/home')
    }

    return (
        <div className='create-note-div'>
            <div className='save-note-container'>
                <div className='pixel' onClick={onSubmit} ><p>{'Save Note =>'}</p></div>
            </div>
            <div className='view-notes-container'>
                <div className='pixel' ><p>{'<= view all notes'}</p></div>
            </div>
            <div className='note-title-div' value={name}>
                <input
                    placeholder='Title'
                    className='note-title-holder'
                    onChange={(e) => setname(e.target.value)}
                >
                </input>
            </div>
            <div class="notes" >
                <div class="note">
                    <div className='note-container'>
                        <div className='notebook-des-container'>
                            Description
                        </div>
                        <div className='notebook-notes-cotainer'>

                            {
                                allNotes.map((note) => {
                                    return (
                                        <div key={note.id} value={note.id} id={note.id}>
                                            <img src={paper} alt={"paper note icon"} className='note-img'>
                                            </img>
                                            <h2 key={note.id}>{note.name}</h2>
                                            <div className='notes-actions-btn' value={note.id}>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>

    );
}

export default NotebookEdit;