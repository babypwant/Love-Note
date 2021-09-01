import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Notebook.scss';
import * as sessionActions from "../../store/notebooks";
import { getNotebooks } from '../../store/notebooks'
import { useHistory } from 'react-router-dom'
import campfire from '../../images/campsite.jpg'
import totoro from '../../images/totoro.gif'
import book from '../../images/book1.png'

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
            <form onSubmit={handleSubmit} className='notebook-form'>
                <div className='Errors'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <h2>Book Name</h2>
                <div className='name-and-desc'>
                    <input
                        type="text"
                        className='notebook-input'
                        placeholder='Awesome name'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                    />
                </div>
                <div className='name-and-desc'>
                    <input
                        type="text"
                        className='notebook-input'
                        placeholder='cool cescription'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='btn-div'>
                    <button className='create-a-book-btn'>| Create |</button>
                </div>

            </form>
        );
    } else {
        return true
    }



    return (
        <div className='create-notebook-container'>
            <div className='totoro-container'>
                <img alt={"Totoro character"} src={totoro}></img>
            </div>
            <div className='brown-square-container'>
                <img alt={"piece of paper"} src={book} className='brown-sqr'></img>
            </div>
            <div className='totoro-speak-container'>
                <h2>" Tell us a story please!" </h2>
            </div>
            <div className='creation-form-container'>
                {notebookList}
                <div className='campfire-img-div'>
                    <img alt={"Campfire"} src={campfire}></img>
                </div>
            </div>
        </div>

    );
}

export default Notebook;