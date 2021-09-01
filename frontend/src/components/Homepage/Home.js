import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import './home.scss'

function Home() {
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [userId, setUser] = useState(0)



    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            console.log(userId)
            setUser(sessionUser.id)
        }

    }, [dispatch, sessionUser, userId])

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     const value = e.target.value
    //     const notebook = notebooks.find((notebook) => notebook.id = value)
    //     console.log(notebook)
    //     if (mode === false) {
    //         setMode(true)
    //     } else {
    //         setMode(false)
    //     }
    //     return dispatch(sessionActions.notebookDelete(notebook))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             console.log(data)
    //         });
    // }

    const editNotebook = (e) => {
        const id = e
        history.push(`/edit/notebook/${id}`)
    }

    /* <h2 className='notebook-description'>{notebook.description}</h2>
    <button type='submit' value={notebook.id} onClick={onSubmit} className='border' > Destroy Book </button>
    <button type='submit' value={notebook.id} onClick={(editNotebook)} className='border'> View Book</button> */

    return (
        <div className='logged-in'>
            <div className='rows'>
                {notebooks.map((notebook) => {
                    return (
                        <div onClick={() => editNotebook(notebook.id)} class="container product-container" value={notebook.id}>
                            <div class="product-box" value={notebook.id}>
                                <div id="box-header" value={notebook.id}>
                                </div>
                                <div id="box-body" value={notebook.id}>
                                    <p class="text-center" value={notebook.id}>{notebook.name} </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    );
}

export default Home;