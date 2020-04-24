import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles.js';

function NotifMsg(props) {

    let { classes } = props;

    let visibility = props.visibility ? 'visible' : 'hidden';

    return(
        <Box className={classes.centeredBox} style={{visibility: visibility}}>
            <Paper elevation={3} className={classes.warningPaper}>
                {props.text}
            </Paper>
        </Box>
    );
}

export default withStyles(styles)(NotifMsg);