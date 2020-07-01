import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from './Card';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../../lib/styles.js';


class CardSet extends Component {

    constructor(props) {
        super(props);

        let cards = this.props.cards.map(card => {
            card.active = false;
            return card;
        })

        this.state = {
            backgroundColor: 'red',
            cards: this.props.cards
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            cards: this.props.cards
        });
    }

    render()
    {
        const { classes } = this.props;

        let click;
        let cardClick;

        if(typeof this.props.onClick == 'function')
            click = () => {this.props.onClick();} 
        else
            click = () => {};

        cardClick = (typeof this.props.cardClick != 'function') ? (x) => {} : this.props.cardClick;

        let classs = classes.cardset;

        if(this.props.selected)
            classs += ' ' + classes.selectedCardset + ' muie';

        return (

            <Box className={classs} 
                onClick={click}>
                {(this.state.cards).map( (card) => {
                    let visibility = "visible";


                    if(card.visible != undefined)
                    {
                        visibility = card.visible ? "visible" : "hidden";
                        if(card.id==1429)
                        {
                            console.log(" ++++ ");
                            console.log(card);
                            console.log(" ++++ ");
                            console.log(visibility);
                            console.log(" ++++ ");
                        }
                    } 

                    return (
                        <Card id={card.id} selected={card.active} 
                            type={card.type} text={card.text} cardClass={this.props.cardClass}
                            onClick={() => {cardClick(card.id);}} visibility={visibility}/>
                    );
                })}
            </Box>
        );
    }
}


export default withStyles(styles)(CardSet);