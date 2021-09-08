import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser?.id
    return (
        <div >
            <nav>
                <div className='navbar-left'>
                    <div className='firstbox'>
                        <NavLink exact to="/home" className='home' >Home</NavLink>
                    </div>
                    <div>
                        <NavLink to={`/library/${userId}`} className='signup'>Library</NavLink>
                    </div>
                </div>
                <div className='navbar-right'>
                    <ProfileButton user={sessionUser} />
                </div>
            </nav>
        </div>
    )
};

export default Navigation;