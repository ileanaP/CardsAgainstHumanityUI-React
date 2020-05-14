import React, { Component } from 'react';
//import Cookies from 'universal-cookie';
import WaitRedirect from '../addons/WaitRedirect';

class Logout extends Component 
{
    componentDidMount() {
        if(JSON.parse(localStorage.getItem('loggedIn')))
        {
            localStorage.removeItem('userData');
            localStorage.setItem('loggedIn', 'false');

/*             const cookies = new Cookies();
            cookies.remove('username');
            cookies.remove('useremail'); */

            this.props.toggleLoginState();
            this.setState({redirect: true});
        }
    }

    render(){
        return(<WaitRedirect link={"/"} ms={1000} />);
    }
}

export default Logout;