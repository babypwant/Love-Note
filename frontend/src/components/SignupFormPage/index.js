import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <body className='background'>

            <form onSubmit={handleSubmit} className='signup-form'>
                <div className='form-wrapper'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div>
                        <label className='title'>
                            Sign Up
                        </label>
                    </div>
                    <div className='form-div'>

                        <label className='signup-label'>
                            Email
                            <input
                                type="text"
                                className='signup-input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-div'>
                        <label className='signup-label'>
                            Username
                            <input
                                type="text"
                                className='signup-input'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-div'>

                        <label className='signup-label'>
                            Password
                            <input
                                type="password"
                                className='signup-input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='form-div'>
                        <label className='signup-label'>
                            Confirm Password
                            <input
                                type="password"
                                className='signup-input'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button className='btn' type="submit">Talk to Karl !</button>
                </div>
            </form>
        </body >
    );
}

export default SignupFormPage;