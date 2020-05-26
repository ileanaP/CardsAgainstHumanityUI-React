import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from './Card';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';


class CardSet extends Component {

/*     constructor(props) {
        super(props);
    } */

    state = {
        backgroundColor: 'red'
    }

    render()
    {
        const { classes } = this.props;



        return (
            <Box className={classes.cardset} 
                onClick={() => {this.props.onClick();}}>
                {(this.props.cards).map( (card) => {
                    return (
                        <Card type={card.type} text={card.text} cardClass={this.props.cardClass}/>
                    );
                })}
            </Box>
        );
    }
}


export default withStyles(styles)(CardSet);