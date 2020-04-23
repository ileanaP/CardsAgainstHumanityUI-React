import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';
import { useParams, Redirect } from "react-router-dom";
import Axios from 'axios';


class Game extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        let idNr = !isNaN(id) ? Number(id) : 0;
        
        this.state = {
            id: idNr,
            box: []
        }
    }

    async componentDidMount() {
        await Axios.get('http://cardsagainsthumanity.test/api/games/' + this.state.id)
            .then(data => { 
                this.setState({box: [ data['data'] ] });
            })
            .catch(error => {
                this.setState({redirect: '/'});
            });;
    }

    render() {
        const { classes } = this.props;
        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <Fragment>
                {(this.state.box).map( (boxx) => {
                    console.log(boxx);
                    return (
                        <div className={classes.Main}>
                            <p>Pula</p>
                        </div>
                    );
                })}
            </Fragment>
        );
    }
}


export default withStyles(styles)(Game);