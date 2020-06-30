import React, { useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CardSet from './CardSet';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../lib/styles.js';
import PropTypes from 'prop-types'


class CardsInfo extends React.Component {

    constructor(props) {
        super(props);

        let open = props.open ? true : false;

        this.state = {
            open: open,
            cards: this.props.cards
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
            x.active = x.id == id ? true : false;
            return x
        });

        this.setState({
            cards: cards
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

        return (
            <nav className={drawerClasses.join(' ')} ref={this.setWrapperRef}>
                <CloseIcon onClick={this.props.close}/>
                <Grid item>
                    <CardSet cards={this.state.cards} cardClass={'playCard'} 
                        cardClick={this.cardClick}/>
                </Grid>
            </nav>
        );
    }
}

CardsInfo.propTypes = {
    children: PropTypes.element.isRequired,
};

export default withStyles(styles)(CardsInfo);