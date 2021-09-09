import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Notebook.scss';
import * as sessionActions from "../../store/notebooks";
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'

//Main bug to fix for tommorrow:

//history.push is not redirecting after I submit, maybe cant be used in a func?

function Notebook() {
    const [name, setname] = useState('')
    const [userId, setUser] = useState(0)
    const [description, setDescription] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();


    let notebookList;
    useEffect(() => {
        dispatch(getNotebooks());
        if (sessionUser) {
            setUser(sessionUser.id)
        }
    }, [dispatch, sessionUser])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length > 0) {
            setErrors([]);
            history.push('/home')
            return dispatch(sessionActions.notebookCreate({ name, userId, description }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['A great book needs a great name']);
    };

    if (notebooks) {
        notebookList = (
            <div>

                <div className='Errors'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div class="container product-container" value={""}>
                    <div class={"product-box"}>
                        <div id="box-header" value={""}>

                        </div>
                        <div id="box-body" value={""}>
                            <p class="name-inp-div" value={""}> <input
                                className='name-change'
                                type="text"
                                placeholder='Book Name'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required
                            /> </p>
                        </div>
                    </div>
                </div>
                <div className='name-and-desc'>
                    <input
                        type="text"
                        className='desc-inp-div'
                        placeholder='Add a description to your book'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>


            </div >

        );
    } else {
        return true
    }

    return (
        <div className='create-notebook-container'>
            <div className='creation-form-container'>
                {notebookList}
                <div className='mixel' onClick={handleSubmit}>
                    <p>Create </p>
                </div>
            </div>
        </div>

    );
}

export default Notebook;