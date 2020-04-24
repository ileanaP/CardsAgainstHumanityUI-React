import React from 'react';
import { Link } from "react-router-dom";

function NavLinks(props) {

    let links = [{name: 'Home', href: '/'}];

    if(localStorage['userData'] == undefined) {
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