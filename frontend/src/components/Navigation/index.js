import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-left'>
                <NavLink exact to="/home" className='navbar-btn fas fa-home'>Home</NavLink>
                <NavLink to='/notebooks' className='create-a-book fas fa-book'>New Notebook</NavLink>
                <NavLink to='/home' className='navbar-btn far fa-sticky-note'>Library</NavLink>
            </div>
            <div className='navbar-right'>
                <ProfileButton user={sessionUser} />
            </div>
        </div>
    );
}

export default Navigation;