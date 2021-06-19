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
            <h2></h2>
        );
    } else {
        return true
    }

    return (
        <div>
            <h2> hello</h2>
        </div>
    );
}

export default Notebook;