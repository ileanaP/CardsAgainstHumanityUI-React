import React from 'react';
import './Toolbar.css';
import { Link } from "react-router-dom";
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import NavLinks from '../addons/NavLinks';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar-nav">
            <div className="toolbar-tgl-btn">
                <DrawerToggleButton click = {props.drawerClickHandler}/>
            </div>
            <div className="toolbar-logo">
                <a href="/"><img src="/logo.svg" height="56px"/></a>
            </div>
            <div className="spacer"></div>
            <div className="toolbar-nav-items">
                <NavLinks click={undefined}/>
            </div>
        </nav>
    </header>
);

export default toolbar;