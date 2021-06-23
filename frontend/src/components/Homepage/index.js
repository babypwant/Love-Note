import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { getNotebooks } from '../../store/notebooks'
import { Redirect, useHistory } from 'react-router-dom'
import './demo.scss'
import loggedOutBackground from '../../images/possible-background-1.gif'

//Main bug to fix for tommorrow:

//history.push is not redirecting after I submit, maybe cant be used in a func?

function Home() {
    const sessionUser = useSelector(state => state.session.user);
    const [userId, setUser] = useState(0)
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const dispatch = useDispatch();
    const history = useHistory();
    let notebookList;
    let background;

    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
        }

    }, [dispatch, sessionUser])

    const onSubmit = (e) => {
        e.preventDefault();
        const val = e.target.value
        const notebook = notebooks[val - 1]
        console.log(notebook)
        return dispatch(sessionActions.notebookDelete(notebook))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data)
            });
    }


    if (sessionUser) {
        background = 'test-2'

        notebookList = (
            <div className='book-shelf'>
                <h2> I am logged in</h2>
                {notebooks.map((notebook) => {
                    return (
                        <div className={`book-${notebook.id}`} value={notebook}>
                            <h2>{notebook.name}</h2>
                            <h3>{notebook.description}</h3>
                            <button type='submit' value={notebook.id} onClick={onSubmit} > | Delete |</button>
                        </div>
                    )
                })}
            </div>
        );
    } else {
        background = 'test'
        notebookList = (
            <div>
                <h2> I am logged out</h2>
            </div>
        )
    }

    return (
        <div className={background}>
            {notebookList}
        </div>

    );
}

export default Home;