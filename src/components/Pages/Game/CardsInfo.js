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
            open: open
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
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.open) {
            this.props.close();
        }
    }


    
    render() {
        const { classes } = this.props;

        let drawerClasses = [classes.drawer, classes.drawerBottom, classes.drawerY];

        if (this.state.open) {
            drawerClasses.push(classes.drawerOpenY);
        }

        return (
            <nav className={drawerClasses.join(' ')} ref={this.setWrapperRef}>
                <CloseIcon onClick={this.props.close}/>
                <Grid item>
                    <CardSet cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'},
                                        {text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'},
                                            {text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'},
                                            {text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}] } />
                </Grid>
            </nav>
        );
    }
}

CardsInfo.propTypes = {
    children: PropTypes.element.isRequired,
};

export default withStyles(styles)(CardsInfo);