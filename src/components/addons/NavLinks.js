import React from 'react';
import { Link } from "react-router-dom";

function NavLinks(props) {

    let links = [{name: 'Home', href: '/'}];

    console.log("~~~~");
    console.log(props.isLoggedIn);
    console.log("~~~~");
    
    if(!props.isLoggedIn) {
        links.push({name: 'Login', href: '/login'});
    }
    else {
        links.push({name: 'Logout', href: '/logout'});
    }

    return(
        <ul>
            {links.map((link) => {
                return(
                    <li><Link to={link.href} onClick={props.click}> {link.name} </Link></li>
                );
            })

            }
        </ul>
    );
}

export default NavLinks;