import React, { useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CardSet from './CardSet';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles.js';
import PropTypes from 'prop-types'


class CardsInfo extends React.Component {

    constructor(props) {
        super(props);

        let open = props.open ? true : false;

        this.state = {
            open: open,
            cards: []
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
        this.setState({open: props.open});

        if(JSON.stringify(props.userHand) != JSON.stringify(this.props.userHand))
        {
            this.processUserHand(props.userHand);
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

    processUserHand(userHand){
        let arr = [];
        let card;

        userHand.forEach(x => {
            card = {
                text: x.text,
                type: x.type
            }
            arr.push(card);
        });

        this.setState({cards: arr});
    }
    
    render() {
        const { classes } = this.props;

        let drawerClasses = [classes.drawer, classes.drawerBottom, classes.drawerY];

        if (this.state.open) {
            drawerClasses.push(classes.drawerOpenY);
        }

        let someCards = [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'},
        {text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'},
            {text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'},
            {text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}];

        someCards = [{text:'Throwing grapes at a man until he loses touch with reality.', type:'white'}, 
                        {text:'My Uber driver, Pavel.', type:'white'}, 
                        {text:'The Hamburglar.', type:'white'},
                        {text:'A stray pube.', type:'white'}, 
                        {text:'White privilege.', type:'white'}, 
                        {text:'Facebook.', type:'white'},
                        {text:'Pac-Man uncontrollably guzzling cum.', type:'white'}, 
                        {text:'Forced sterilization.', type:'white'}, 
                        {text:'An Oedipus complex.', type:'white'},
                        {text:'Scientology.', type:'white'}];


        console.log(someCards);
        console.log(this.state.cards);

        return (
            <nav className={drawerClasses.join(' ')} ref={this.setWrapperRef}>
                <CloseIcon onClick={this.props.close}/>
                <Grid item>
                    {/*<CardSet cards={this.state.cards} />*/}
                    <CardSet cards={ someCards } />
                </Grid>
            </nav>
        );
    }
}

CardsInfo.propTypes = {
    children: PropTypes.element.isRequired,
};

export default withStyles(styles)(CardsInfo);