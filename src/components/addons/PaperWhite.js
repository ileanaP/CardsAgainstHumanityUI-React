import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../lib/styles.js';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function PaperWhite(props) {

    let { classes } = props;

    return(
        <Box key={"paperwhite-box-1"} className={classes.centeredBox}>
            <Box key={"paperwhite-box-2"} clone pt={2} pr={1} pb={1} pl={2} width={400} height={500} >
                <Paper key={"paperwhite-paper-1"} elevation={3}  style={{textAlign: "center"}}>
                    <Grid key={"paperwhite-grid-1"} container direction="column" style={{height:"100%"}}>
                    {props.content()}
                    </Grid>
                </Paper>  
            </Box>
        </Box>
    );
}

export default withStyles(styles)(PaperWhite);