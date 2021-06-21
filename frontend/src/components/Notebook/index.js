import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Notebook.css';
import { getNotebooks } from '../../store/notebooks'
import { getUsers } from '../../store/users'

//remember to make a hidden field with userId set from state
//so we can assoc. userId into our table

//Main bug to fix for tommorrow:
/*
when I refresh my sessions user information returns null, why?
works only on the first instance of loading the page
*/

function Notebook() {
    const [notebook, setNotebook] = useState('')
    const [userId, setUserId] = useState(0)
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const dispatch = useDispatch();


    let notebookList;
    useEffect(() => {
        dispatch(getNotebooks());
        dispatch(getUsers())
        console.log(sessionUser)
    }, [dispatch])


    if (notebooks) {
        notebookList = (
            <form>
                <label>Notebook Name</label>
                <input
                    name='userId'
                    type='hidden'
                    value={userId}
                ></input>
                <div>
                    <input
                        type="text"
                        className='notebook-input'
                        value={notebook}
                        onChange={(e) => setNotebook(e.target.value)}
                        required
                    />
                </div>
            </form>
        );
    } else {
        return true
    }


    //Possible useful code to get all notebooks at home page
    // {
    //     notebooks.map(notebook => {
    //         return <h2>{notebook.name}</h2>
    //     })
    // }

    return (
        <div>
            {notebookList}
        </div>
    );
}

export default Notebook;