import React, { useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CardSet from './CardSet';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../lib/styles.js';
import PropTypes from 'prop-types'
import Btn from '../../addons/Btn';


class CardsInfo extends React.Component {

    constructor(props) {
        super(props);

        let open = props.open ? true : false;
        let pick = parseInt(props.pick);

        let cards = this.props.cards.map(x => {
            x.visible = true;
            return x;
        });

        this.state = {
            open: open,
            cards: this.props.cards,
            cardClicked: null,
            pick: pick,
            cardsToSend: []
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentWillReceiveProps(props) {
        this.setState({
            open: props.open,
            pick: parseInt(props.pick)
        });

        if(JSON.stringify(props.cards) != JSON.stringify(this.props.cards))
        {
            this.setState({cards: props.cards});
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.open) {
            this.props.close();
        }
    }
    
    cardClick = (id) => {
        let cards = this.state.cards.map(x => {
            x.active = x.id == id && !x.active ? true : false;
            return x
        });

        let cardClicked = cards.filter(x => x.active);

        this.setState({
            cards: cards,
            cardClicked: cardClicked.length != 0 ? cardClicked[0].id : null
        });
    }

    sendCard = (id) => {
        let cards = this.state.cards;
        let cardClicked = cards.filter(x => x.active);
        cardClicked = cardClicked.length != 0 ? cardClicked[0].id : null;
        let cardsToSend = this.state.cardsToSend;

        cardsToSend.push(cardClicked);

        cards = cards.map(x => {
            x.active = false;
            x.visible = x.id == id ? false : true;
            return x
        });

        console.log("****************");
        console.log(id);
        console.log("~~~~~~~~~~~~~~~~~~~~~~");
        console.log(cards);

        this.setState({
            cards: cards,
            cardsToSend: cardsToSend,
            cardClicked: null
        });
    }

    render() {
        const { classes } = this.props;

        let drawerClasses = [classes.drawer, classes.drawerBottom, classes.drawerY];

        if (this.state.open) {
            drawerClasses.push(classes.drawerOpenY);
        }

        let someCards = [{text:'Throwing grapes at a man until he loses touch with reality.', type:'white'}, 
                        {text:'My Uber driver, Pavel.', type:'white'}, 
                        {text:'The Hamburglar.', type:'white'},
                        {text:'A stray pube.', type:'white'}, 
                        {text:'White privilege.', type:'white'}, 
                        {text:'Facebook.', type:'white'},
                        {text:'Pac-Man uncontrollably guzzling cum.', type:'white'}, 
                        {text:'Forced sterilization.', type:'white'}, 
                        {text:'An Oedipus complex.', type:'white'},
                        {text:'Scientology.', type:'white'}];

        let sendCardVisibility;
        let sendCard;
        let revertAction;
        
        if(this.state.cardsToSend.length == this.state.pick)
        {
            console.log("here @@@ ...");
            sendCard = <Btn bgColor={"darkred"} text={"Send Card(s)"}
                onClick={() => {this.props.sendCards(this.state.cardsToSend)}} />
            
            revertAction = <Btn text={"Revert Action"} />
        }
        else
        {
            console.log("and here @@@ ...");
            sendCardVisibility = this.state.cardClicked != null ? "visible" : "hidden";
            sendCard = <Btn bgColor={"darkred"} text={"Send Card"}
                onClick={() => {this.sendCard(this.state.cardClicked)}} 
                visibility={sendCardVisibility} />
        }

        return (
            <nav className={drawerClasses.join(' ')} ref={this.setWrapperRef}>
                <CloseIcon onClick={this.props.close}/>
                <Grid item>
                    <CardSet cards={this.state.cards} cardClass={'playCard'} 
                        cardClick={this.cardClick}/>
                </Grid>
                <Grid item>
                    {sendCard} {revertAction}
                </Grid>
            </nav>
        );
    }
}

CardsInfo.propTypes = {
    children: PropTypes.element.isRequired,
};

export default withStyles(styles)(CardsInfo);