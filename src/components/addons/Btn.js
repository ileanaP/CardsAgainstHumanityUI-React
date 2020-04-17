import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    btn: {
        marginBottom: '24px',
        padding: '16px',
        width: 200,
        fontWeight: 'bold'
    },
    btnHover: {
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'purple'
        },
        '&:active': {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'purple'
        }
    },
    indigoBg: {
        backgroundColor: 'indigo',
        color: 'whitesmoke'
    },
    purpleBg: {
        backgroundColor: 'purple',
        color: 'whitesmoke'
    }
}

function Btn(props) {

    let { classes } = props;
    let btn;

    var clsList = require('classnames');
    clsList = clsList({[classes.btn] : true}, {[classes.btnHover] : true}, { [classes[props.bgColor + "Bg"]] : true});

    var btnText = props.text !== undefined ? props.text : "Some text";

    return(
        <Button variant="contained" className={clsList}>{btnText}</Button>
    );
}

export default withStyles(styles)(Btn);