import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Notebook.css';

function Notebook({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            //<tag>
            <h2>Hello</h2>
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