import React, { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';


function Card(props) {

    let fontSize = props.type == 'white' ? (props.text.length > 91 ? 12 : 16) : (props.text.length > 135 ? 14 : 16);

    const { classes } = props;

    console.log("~~~");
    console.log(props.cardClass);

    return (
        <Box clone pt={2} pr={1} pb={1} pl={2} className={classes[props.type + "Card"] + ' '+ props.cardClass}>
            <Paper elevation={3}>
                <Typography style={{fontSize: fontSize}}>
                    {props.text}
                </Typography>
            </Paper>
            
        </Box>
    );
}


export default withStyles(styles)(Card);