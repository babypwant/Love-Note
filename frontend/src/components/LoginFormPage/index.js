import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.scss';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/home" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                console.log(errors)
            });
    }

    return (
        <div className='login-div'>
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='username-div'>
                    <input
                        type='text'
                        value={credential}
                        placeholder='username'
                        className='username-input'
                        onChange={(e) => setCredential(e.target.value)}
                    >
                    </input>
                </div>
                <div className='password-div'>
                    <input
                        type='text'
                        value={password}
                        placeholder='password'
                        className='password-input'
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>
                <button class="btn btn--stripe">Login</button>
            </form>
        </div >
    );
}

export default LoginFormPage;