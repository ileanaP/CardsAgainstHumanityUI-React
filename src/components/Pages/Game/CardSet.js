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
        backgroundColor: 'red',
        activeCard: 0
    }

    updateCardset = (id) => {
        if(this.props.cardClass == 'playCard')
        {
            this.setState({
                activeCard: (this.state.activeCard == id) ? 0 : id
            });
        }
        else
        {
            console.log('hellow from the insidee');
        }
    }

    render()
    {
        const { classes } = this.props;

        let click;

        if(typeof this.props.onClick == 'function')
            click = () => {this.props.onClick(this.props.playerId);} 
        else
            click = () => {};

        let classs = classes.cardset;

        if(this.props.selected)
            classs += ' ' + classes.selectedCardset + ' muie';

        return (
            <Box className={classs} 
                onClick={click}>
                {(this.props.cards).map( (card) => {
                    return (
                        <Card id={card.id} selected={this.state.activeCard == card.id ? true : false} 
                            type={card.type} text={card.text} cardClass={this.props.cardClass}
                            onClick={this.updateCardset}/>
                    );
                })}
            </Box>
        );
    }
}


export default withStyles(styles)(CardSet);