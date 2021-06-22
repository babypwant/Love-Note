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

    if (sessionUser) {
        background = 'test-2'
        notebookList = (
            <div>
                <h2> I am logged in</h2>
                {
                    notebooks.forEach(notebook => {
                        { console.log(notebook.name) }
                        <li>{notebook.name}</li>
                    })
                }
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
            <ul>
                {notebookList}
                {notebooks.forEach((notebook => {
                    { console.log(notebook) }
                    <li>{notebook.name}</li>
                }))}
            </ul>
        </div>

    );
}

export default Home;