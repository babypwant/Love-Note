import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './AllNotes.scss';
import * as sessionActions from "../../store/notes";
import { getNotes } from '../../store/notes'
import { getUsers } from '../../store/users'
import { getNotebooks } from '../../store/notebooks';
import { useHistory, useParams } from 'react-router';
import paper from '../../images/paper.png'

function AllNotes() {
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => Object.values(state.notes))
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const allNotes = notes.filter(function (note) {
        console.log(id)
        return note.notebookId === Number(id);
    })

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getUsers())
        dispatch(getNotebooks())
    }, [dispatch, sessionUser])

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
                return data
            });
    }
    return (
        <div className='all-notes-page'>
            <div className='moon-container'>
                <div id="moon"></div>
                <div className='paper-container'>
                    {
                        allNotes.map((note) => {
                            return <div clasname='piece-of-paper' key={note.id} value={note.id} id={note.id}>
                                <h2 key={note.id}>{note.name}</h2>
                                <img src={paper} alt={"paper note icon"} className='paper-img'></img>
                                <div className='notes-actions-btn' value={note.id}>
                                    <div onClick={deleteLore} value={note.id} id={note.id} className='pixel'><p id={note.id}>Delete lore</p></div>
                                    <div onClick={onClick} key={note.id} id={note.id} value={note.id} className='pixel'><p id={note.id}>Edit Chapter</p> </div>
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