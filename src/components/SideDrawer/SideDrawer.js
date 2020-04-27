import React from 'react';
import './SideDrawer.css';
import NavLinks from '../addons/NavLinks';

const sideDrawer = props => { 
    let drawerClasses = ['side-drawer'];

    if (props.show) {
        drawerClasses.push('open');
    }

    return (
        <nav className={drawerClasses.join(' ')}>
            <NavLinks click={props.closeSideDrawerFunction} isLoggedIn={props.isLoggedIn}/>
        </nav>
    );
};

export default sideDrawer;