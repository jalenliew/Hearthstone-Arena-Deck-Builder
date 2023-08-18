import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {

    return (
        <div className='navbar'>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="/">
                Home
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="/arena">
                Arena Deck Builder
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="deck">
                Deck Builder
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="cards">
                Card List
            </NavLink>
            <Outlet />
        </div>)
    ;
};

export default Navbar;