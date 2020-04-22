import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles.js';

function Btn(props) {

    let { classes } = props;
    let btn;

    var clsList = require('classnames');
    clsList = clsList({[classes.btn] : true}, {[classes.btnHover] : true}, { [classes[props.bgColor + "Bg"]] : true});

    var btnText = props.text !== undefined ? props.text : "Some text";

    return(
            <Button variant="contained" className={clsList} href={props.href} >{btnText}</Button>
    );
}

export default withStyles(styles)(Btn);