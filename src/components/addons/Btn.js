import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../lib/styles.js';

function Btn(props) {

    let { classes } = props;

    var clsList = require('classnames');
    clsList = clsList({[classes.btn] : true}, {[classes.btnHover] : true}, { [classes[props.bgColor + "Bg"]] : true});

    var btnText = props.text !== undefined ? props.text : "Some text";

    const btnAction = props.onClick !== undefined ? props.onClick : null;

    let link = props.link !== undefined ? props.link : "";

    return(
        <Link className={classes.linkStyle} to={link}>
            <Button variant="contained" className={clsList} onClick={btnAction}>{btnText}</Button>
        </Link>
    );
}

export default withStyles(styles)(Btn);