import React, { Component } from 'react';
import Side from '../../Side/Side';
import GameBoxes from './GameBoxes';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Btn from '../../addons/Btn';
import { styles } from '../../styles.js';


class Main extends Component {

    render(){

    const { classes } = this.props;

    const axios = require('axios');

    axios.get()
    .then(function (response) {
        this.setState({
            games: response['data'],
          });
    }).catch(function (error) {
      console.log(error);
    });

    return(
        <div className={classes.Main}>
            <Grid container justify = "center">
                <Btn bgColor={"indigo"} text={"New Game"}/>
            </Grid>
            <div>
                <GameBoxes />
            </div>
        </div>
    );
    
}
}


export default withStyles(styles)(Main);