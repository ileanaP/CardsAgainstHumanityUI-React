import React, { Component } from 'react';
import './Main.css';
import Side from '../../Side/Side';
import GameBox from './GameBox';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Btn from '../../addons/Btn';

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
            <Grid container justify = "center">
                <Btn bgColor={"indigo"} text={"New Game"}/>
            </Grid>
            <div>
                <GameBox />
                <GameBox />
                <GameBox />
                <GameBox />
            </div>
        </div>
    );
}


export default withStyles(styles)(Main);