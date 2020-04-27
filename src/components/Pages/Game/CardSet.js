import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from './Card';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';


function CardSet(props) {

    const { classes } = props;

    return (
        <Box className={classes.cardset}>
            {(props.cards).map( (card) => {
                console.log(card);
                return (
                    <Card type={card.type} text={card.text} />
                );
            })}
        </Box>
    );
}


export default withStyles(styles)(CardSet);