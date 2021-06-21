import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Notebook.css';
import { getNotebooks } from '../../store/notebooks'

//remember to make a hidden field with userId set from state
//so we can assoc. userId into our table

function Notebook() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.users);
    const notebooks = useSelector(state => Object.values(state.notebooks))
    let sessionLinks;

    useEffect(() => {
        dispatch(getNotebooks());
    }, [dispatch])

    if (sessionUser) {
        sessionLinks = (
            <form>
                <div>
                    <label>Notebook Name: </label>
                    <h2>hello</h2>
                </div>
            </form>
        );
    } else {
        return true
    }

    return (
        <div>
            {sessionLinks}
        </div>
    );
}

export default Notebook;