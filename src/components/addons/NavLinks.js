import React from 'react';
import { Link } from "react-router-dom";

function NavLinks(props) {
    return(
        <ul>
            <li><Link to="/"         onClick={props.click}> Home               </Link></li>
            <li><Link to="/login"     onClick={props.click}> Login/Register </Link></li>
        </ul>
    );
}

export default NavLinks;