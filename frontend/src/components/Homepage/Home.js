import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import './home.scss'
import notebookImage from '../../images/book1.png'

//Main bug to fix for tommorrow:

//history.push is not redirecting after I submit, maybe cant be used in a func?
//Backgrounds not taking full screen
//scale backgrouds and center 
// sending the wrong thing into the array beacuse index does not start at 0
//week14 wednesday lecture

function Home() {
    const [mode, setMode] = useState(false)
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const dispatch = useDispatch();
    const history = useHistory();
    let bookshelf;
    const sessionUser = useSelector(state => state.session.user);
    const [userId, setUser] = useState(0)


    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
        }

    }, [dispatch, sessionUser])

    const onSubmit = (e) => {
        e.preventDefault();
        const value = e.target.value
        const notebook = notebooks.find((notebook) => notebook.id = value)
        if (mode === false) {
            setMode(true)
        } else {
            setMode(false)
        }
        console.log(notebook)
        return dispatch(sessionActions.notebookDelete(notebook))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data)
            });
    }

    const editNotebook = (e) => {
        e.preventDefault();
        const id = e.target.value
        history.push(`/edit/notebook/${id}`)
    }


    return (
        <div className='logged-in'>
            <div className='splash'>
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
                                    <button type='submit' value={notebook.id} onClick={onSubmit} > | Delete |</button>
                                    <button type='submit' value={notebook.id} onClick={(editNotebook)}> | Edit Book|</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}

export default Home;