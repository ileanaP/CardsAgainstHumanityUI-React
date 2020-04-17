import React from 'react';
import { Link } from "react-router-dom";

function NavLinks(props) {
    return(
        <ul>
            <li><Link to="/"         onClick={props.click}> Home               </Link></li>
            <li><Link to="/addd"     onClick={props.click}> Add Income/Expense </Link></li>
            <li><Link to="/expense"  onClick={props.click}> History            </Link></li>
            <li><Link to="/pancakes" onClick={props.click}> List               </Link></li>
            <li><Link to="/details"  onClick={props.click}> Details            </Link></li>
            <li><Link to="/settings" onClick={props.click}> Settings           </Link></li>
        </ul>
    );
}

export default NavLinks;