import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Typography from '@material-ui/core/Typography';
import Btn from '../../addons/Btn';
import Card from './Card';
import CardSet from './CardSet';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';
import { useParams, Redirect } from "react-router-dom";


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
        if(!JSON.parse(localStorage.getItem('loggedIn'))) {
            this.setState({redirect: "/"});
            return;
        }

        let user = JSON.parse(localStorage.getItem('userData'));

        await Axios.get('http://cardsagainsthumanity.test/api/games/' + this.state.id + '/users/' + user['id'])
            .then(data => {
                console.log('ok');
            })
            .catch(error => {
                this.setState({redirect: '/'});
            });

        /* await Axios.get('http://cardsagainsthumanity.test/api/games/' + this.state.id)
            .then(data => { 
                this.setState({box: [ data['data'] ] });
            })
            .catch(error => {
                this.setState({redirect: '/'});
            }); */
    }
    
    render() {        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { classes } = this.props;

        return (
            <Fragment>
                <Grid container spacing={2} >
                    <Grid item xs={2}>
                        <Card text={"ala balla"} type="black" />
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container >
                        <Grid item>
                                <CardSet cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(styles)(Game);