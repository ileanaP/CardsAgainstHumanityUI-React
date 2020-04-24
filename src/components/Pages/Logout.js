import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';


function Logout() 
{
    localStorage.removeItem('userData');

    const cookies = new Cookies();
    cookies.remove('username');
    cookies.remove('useremail');

    return(
        <Redirect to={"/"} />
    );
}

export default Logout;