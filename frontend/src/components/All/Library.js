import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import { getNotes } from '../../store/notes';
import paper from '../../images/paper.png'
import './Library.scss'

function Library() {
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const notes = useSelector(state => Object.values(state.notes))
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const sessionId = useSelector(state => state.session.user?.id);
    const [userId, setUser] = useState(0)
    const allNotes = notes.filter(function (note) {
        console.log(sessionId)
        return note.notebookId === Number(sessionId);
    })
    console.log(allNotes)



    useEffect(() => {
        dispatch(getNotebooks());
        dispatch(getNotes());

        if (sessionUser) {
            setUser(sessionUser.id)
        }

    }, [dispatch, sessionUser, userId])

    const editNotebook = (e) => {
        const id = e
        history.push(`/edit/notebook/${id}`)
    }

    const newNotebook = () => {
        history.push('/notebooks');
    };

    const editNote = (id) => {
        console.log(id)
        history.push(`/edit/note/${id}`)
    };
    return (
        <div className='logged-in'>

            <div className='rows'>
                {notebooks.map((notebook) => {
                    return (
                        <div class="container product-container" value={notebook.id}>
                            <div onClick={() => editNotebook(notebook.id)} class="products-box" value={notebook.id}>
                                <div id="boxs-header" value={notebook.id}>
                                </div>
                                <div id="boxs-body" value={notebook.id}>
                                    <p class="texts-center" value={notebook.id}>{notebook.name} </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {
                    notes.map((note) => {
                        return (
                            <div className='note-paper-container'>
                                <div clasname='notes-paper' onClick={() => editNote(note.id)} key={note.id} value={note.id} id={note.id}>
                                    <div>
                                        <h2 className='note-header' key={note.id}>{note.name}</h2>
                                        <img src={paper} alt={"paper note icon"} className='notes-img'></img>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='new-notenook-btn'>
                <div class='btn-container' >
                    <div class="pixel" onClick={newNotebook} ><p>New Notebook</p></div>
                </div>
            </div>
        </div>

    );
}

export default Library;