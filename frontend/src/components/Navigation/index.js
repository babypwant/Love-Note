import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    // if (sessionUser) {
    return (
        <div >
            <nav>
                <div className='navbar-left'>
                    <div className='firstbox'>
                        <NavLink exact to="/home" className='home' >Home</NavLink>
                    </div>
                    <div>
                        <NavLink to='/notebooks' className='login'>New Notebook</NavLink>
                    </div>
                    <div>
                        <NavLink to='/home' className='signup'>Library</NavLink>
                    </div>
                </div>
                <div className='navbar-right'>
                    <div className='thirdbox'>
                        <ProfileButton user={sessionUser} />
                    </div>
                </div>
            </nav>
        </div>
        //     );
        // } else {
        //     return (
        //         <>
        //         </>
        // }

    )

}

export default Navigation;