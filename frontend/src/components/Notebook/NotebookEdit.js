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
import { notebookDelete } from '../../store/notebooks';


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
    const numId = parseInt(id)
    const allNotes = notes.filter(function (note) {
        return note.notebookId === Number(id);
    })

    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
        }
        dispatch(getNotes());

        const notebook = notebooks.find(notebook => notebook.id === numId)

        setDescription(notebook?.description)
        setname(notebook?.name)
    }, [dispatch, sessionUser, userId, id])

    const onSubmit = () => {
        const notebook = notebooks.find((notebook) => notebook.id = id)
        setname(notebook.name)
        setDescription(notebook.description)
        history.push('/home')
        return dispatch(sessionActions.notebookEdit({ id, name, description }))
    }


    const thisNote = (e) => {
        console.log(e.target)
        const noteId = e.target.id
        history.push(`/edit/note/${noteId}`)
    }

    const newNote = () => {
        history.push(`/notes/${id}`)
    };

    const deleteNotebook = () => {
        const id = numId
        dispatch(notebookDelete({ id, description, userId }))
        history.push('/home')
    };

    return (
        <div className='create-note-div'>
            <div className='view-notes-container'>
                <div className='pixel' onClick={newNote} ><p>{'New Note =>'}</p></div>
            </div>
            <div className='save-note-container'>
                <div className='pixel' onClick={onSubmit} ><p>{'Save Notebook =>'}</p></div>
            </div>
            <div className='del-notes-container'>
                <div className='pixel' onClick={deleteNotebook} ><p>{'Delete book'}</p></div>
            </div>
            <div className='note-title-div' value={name}>
                <input
                    placeholder={name}
                    className='note-title-holder'
                    onChange={(e) => setname(e.target.value)}
                >
                </input>
            </div>
            <div class="notes" >
                <input type='hidden' value={id} />
                <div class="note">
                    <div className='note-container'>
                        <div className='notebook-des-container'>
                            {description}
                        </div>
                        <div className='notebook-notes-cotainer'>

                            {
                                allNotes.map((note) => {
                                    return (
                                        <div onClick={(e) => thisNote(e)} key={note.id} value={note.id} className='img-border'>
                                            <img value={note.id} src={paper} alt={"paper note icon"} id={note.id} className='note-img'>
                                            </img>
                                            <h2 value={note.id} className='img-text' key={note.id}>{note.name}</h2>
                                            <div value={note.id} className='notes-actions-btn'>
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