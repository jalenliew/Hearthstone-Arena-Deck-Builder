import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = () => {

    return (
        <div className='navbar'>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="hearthstone-deckbuilder">
                Home
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="hearthstone-deckbuilder/arena">
                Arena Deck Builder
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="hearthstone-deckbuilder/deck">
                Deck Builder
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "selected" : "unselected"} to="hearthstone-deckbuilder/cards">
                Card List
            </NavLink>
            <Outlet />
        </div>)
    ;
};

export default Navbar;