import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import './demo.scss'
import notebookImage from '../../images/book1.png'
import girl from '../../images/girl.gif'
import bookshelf from '../../images/bookshelf.png'

//Main bug to fix for tommorrow:

//history.push is not redirecting after I submit, maybe cant be used in a func?
//Backgrounds not taking full screen
//scale backgrouds and center 
// sending the wrong thing into the array beacuse index does not start at 0
//week14 wednesday lecture

function Home() {
    const sessionUser = useSelector(state => state.session.user);
    const [userId, setUser] = useState(0)
    const [mode, setMode] = useState(false)
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const dispatch = useDispatch();
    const history = useHistory();
    let notebookList;
    let background;
    let bookAmount = 0;
    let bookshelf;

    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
        }

    }, [dispatch, sessionUser])

    const onSubmit = (e) => {
        e.preventDefault();
        const value = e.target.value
        const notebook = notebooks[value - 1]
        if (mode === false) {
            setMode(true)
        } else {
            setMode(true)
        }
        return dispatch(sessionActions.notebookDelete(notebook))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data)
            });
    }

    const editNotebook = (e) => {
        e.preventDefault();
        const bookId = e.target.value - 1
        history.push(`/edit/notebook/${bookId}`)
    }


    if (sessionUser) {
        background = 'test-2'
        notebookList = (
            <div className='rows'>
                <div>
                    <img src={bookshelf} className='shelf'></img>
                </div>
                {notebooks.map((notebook) => {
                    return (
                        <div>
                            <div className={`book-${notebook.id}`} value={notebook} key={`book-${notebook.id}`}>
                                <h2 className='notebook-info'>{notebook.name}</h2>
                                <img src={notebookImage} className='book' />
                                <h2 className='notebook-info'>{notebook.description}</h2>
                                <button type='submit' value={bookAmount += 1} onClick={onSubmit} > | Delete |</button>
                                <button type='submit' value={bookAmount += 1} onClick={(editNotebook)}> | Edit Book|</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    } else {
        background = 'test'
        notebookList = (
            <div className='content-div'>
                <div className='wording'>
                    <h2> Vibe anywhere</h2>
                </div>
                <div className='image-container'>
                    <img src={girl} className='girl'></img>
                </div>
            </div>
        )
    }

    return (
        <div className={background}>
            <div className='splash'>
                {notebookList}
            </div>
        </div>

    );
}

export default Home;