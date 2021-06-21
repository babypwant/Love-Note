import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NavLink to='/notebooks'>Create a Notebook</NavLink>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='navbar-right'>
                    <NavLink to="/login" className='navbar-btn'>Log In</NavLink>
                    <NavLink to="/signup" className='navbar-btn'>Sign Up</NavLink>
                </div>
            </>
        );
    }

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-left'>
                <i class="fab fa-evernote"></i>
                <NavLink exact to="/" className='navbar-btn fas fa-home'>Home</NavLink>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;