import React, { Component } from 'react';
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
import PlayerInfo from './PlayerInfo';
import Card from './Card';
import CardSet from './CardSet';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';
import Burger from '../../addons/Burger';
import { useParams, Redirect } from "react-router-dom";

class Game extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        let idNr = !isNaN(id) ? Number(id) : 0;

        this.state = {
            id: idNr,
            box: [],
            display: 'none',
            playerInfoOpen: false,
            sideDrawerOpen: false
        }
    }

    openPlayerInfo = () => {
        this.setState({playerInfoOpen : true});
      };

    async componentDidMount() {

        await Axios.get(global.api + 'games/' + this.state.id)
            .then(data => { 
                this.setState({box: [ data['data'] ] });
            })
            .catch(error => {
                this.setState({redirect: '/'});
            });

        if(!JSON.parse(localStorage.getItem('loggedIn')))
        {
            this.setState({redirect: "/"});
            return;
        }

        let user = JSON.parse(localStorage.getItem('userData'));

        await Axios.get(global.api + 'games/' + this.state.id + '/users/' + user['id'])
            .then(data => {
                if(user['game'] != this.state.id)
                {
                    user['game'] = this.state.id;
                    localStorage.setItem('userData', JSON.stringify(user));
                }
            })
            .catch(error => {
                if(error.response !== undefined && error.response.status == 403) 
                {
                    this.setState({redirect: '/'});    
                }
                else 
                {
                    console.log(error);
                }
            });
    }
    
    render() {        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { classes } = this.props;

        let openn = this.state.playerInfoOpen ? true : false;

        return (
            <div className={"muieee"}>
                <PlayerInfo open={this.state.playerInfoOpen}/>
                <Grid container>
                    <Grid item xs={3}>
                        <Grid container>
                            <Grid item>
                                <Card text={"ala balla"} type="black" />
                            </Grid>
                            <Grid item>
                                <Btn bgColor={"gray"} text={"Leave Game"}
                                     onClick={this.props.leaveGame} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
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
                    <Grid item xs={1}>
                        <Burger bgColor={"purple"} click={this.openPlayerInfo}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Game);