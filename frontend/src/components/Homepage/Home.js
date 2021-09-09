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
    return (
        <div className='logged-in'>

            <div className='rows'>
                {notebooks.map((notebook) => {
                    return (
                        <div class="container product-container" value={notebook.id}>
                            <div onClick={() => editNotebook(notebook.id)} class="product-box" value={notebook.id}>
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
            <div className='new-notenook-btn'>
                <div class='btn-container' >
                    <div class="mixel" onClick={newNotebook} ><p>New Notebook</p></div>
                </div>
            </div>
        </div>

    );
}

export default Home;