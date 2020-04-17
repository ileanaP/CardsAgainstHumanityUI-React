import React, { Component } from 'react';
import './Main.css';
import Side from '../../Side/Side';
import GameBox from './GameBox';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = {
    Main: {
        ['@media (max-width:768px)'] : {
            textAlign: 'center'
        }
    }
};


function Main(props) {

    const { classes } = props;

    return(
        <div className={classes.Main}>
            <GameBox />
            <GameBox />
            <GameBox />
            <GameBox />
        </div>
    );
}


export default withStyles(styles)(Main);