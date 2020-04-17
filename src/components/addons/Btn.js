import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    indigoBg: {
        backgroundColor: 'indigo',
    },
    btnRoot: {
        backgroundColor: 'purple',
        color: 'whitesmoke',
        '&:hover': {
            backgroundColor: 'white',
            color: 'purple'
        },
        '&:active': {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'purple'
        },
        marginBottom: '24px',
        padding: '16px',
        width: 200,
        fontWeight: 'bold'
    }
}

function Btn(props) {

    let { classes } = props;
    let btn;

   /*let clsList = classNames({
        classes.indigoBg: props.bgColor != "undefined",
        classes.btnRoot: true
    });*/

    btn = <Button variant="contained" className={classes.btnRoot}>Enter Gamee</Button>;

    return(
        <div>
            {btn}
        </div>
    );
}

export default withStyles(styles)(Btn);