import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';


class WaitRedirect extends Component 
{
    constructor() {
        super();

        this.state = { redirect: false }
    }

    componentDidMount() {    
        setTimeout(function() {
            this.setState({redirect: true}); 
        }.bind(this), this.props.ms);
    }

    render(){
        let redirect;
        
        if(this.state.redirect)
            redirect = <Redirect to={this.props.link} />

        return(
            <Fragment>
                {redirect}
            </Fragment>
        );
    }
}

export default WaitRedirect;