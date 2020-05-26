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
import CardsInfo from './CardsInfo';
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
        let user = JSON.parse(localStorage.getItem('userData'));

        this.state = {
            id: idNr,
            box: [],
            display: 'none',
            playerInfoOpen: false,
            cardsInfoOpen: false,
            cards: [],
            user: user,
            userHand: []
        }

        this.box = null;
        this.round = null;
        this.cards = null;
        this.userCards = null;
        this.cicle = 0;
        this.allowedToPlay = true;
    }

    togglePlayerInfo = () => {
        let playerInfoOpen = !this.state.playerInfoOpen;
        this.setState({playerInfoOpen : playerInfoOpen});
    }

    toggleCardsInfo = () => {
        let cardsInfoOpen = !this.state.cardsInfoOpen;
        this.setState({cardsInfoOpen : cardsInfoOpen});
    }

    async componentDidMount() {

        const canUserAccessGame = this.canUserAccessGame();
        const fetchGameData = this.fetchGameData();
        const fetchRoundData = this.fetchRoundData();

        Promise.all([ canUserAccessGame, fetchGameData, fetchRoundData]).then((responses) => {
            if(!this.allowedToPlay || this.box == null || this.round == null )
                this.setState({redirect: '/' });
            else
            {
                const fetchCardData = this.fetchCardData(this.round['card_data']);
                const fetchPlayerCards = this.fetchPlayerCards(this.round['id']);

                Promise.all([ fetchCardData, fetchPlayerCards]).then((responses) => {
                    console.log('got to here <3 <3');
                    if(this.cards == null || this.userCards == null)
                        this.setState({redirect: '/' });
                    else
                    {
                        let userHand = this.userCards.slice(0,10);
                        this.userCards = this.userCards.slice(10, this.userCards.length);
                        

                        this.setState({
                            userHand: userHand,
                            cards: this.cards
                        });
                    }
                });
            }
        });
    }

    async fetchRoundData()
    {
        await Axios.get(global.api + 'games/' + this.state.id + '/rounds')
        .then(data => {
            data = data['data'];
            this.round = data[data.length-1];            
        })
        .catch(error => {

        });
    }

    async canUserAccessGame()
    {
        if(!JSON.parse(localStorage.getItem('loggedIn')))
        {
            this.allowedToPlay = false;
        }

        await Axios.get(global.api + 'games/' + this.state.id + '/users/' + this.state.user['id'])
            .then(data => {
                if(this.state.user['game'] != this.state.id)
                {
                    let user = this.state.user
                    user['game'] = this.state.id;
                    localStorage.setItem('userData', JSON.stringify(user));
                }
            })
            .catch(error => {
                if(error.response !== undefined && error.response.status == 403) 
                {
                    this.allowedToPlay = false;
                }
                else 
                {
                    console.log(error);
                }
            });
    }

    async fetchGameData() {
        await Axios.get(global.api + 'games/' + this.state.id)
            .then(data => {
                this.box = data['data'];
                //this.setState({box: [ data['data'] ] });
            })
            .catch(error => {
                this.setState({redirect: '/'});
            });
    }

    async fetchCardData(cards){
        await Axios.get(global.api + 'cards/' + cards)
            .then(data => {
                this.cards = data['data'];
            })
            .catch(error => {
                console.log(error);
            });
    }

    async fetchPlayerCards(round){
        await Axios.get(global.api + 'users/' + this.state.user['id'] + '/rounds/' + round)
            .then(data => {
                this.userCards = data['data'];
            })
            .catch();
    }

    someClick = () => {
        console.log('some click');
    }
    
    render() {
        console.log('render once');
        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { classes } = this.props;

        return (
            <div className={"muieee"}>
                <PlayerInfo open={this.state.playerInfoOpen} close={this.togglePlayerInfo}/>
                <CardsInfo open={this.state.cardsInfoOpen} close={this.toggleCardsInfo} 
                    userHand={this.state.userHand} />
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
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'}  cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'}  cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                            <Grid item>
                                <CardSet onClick={this.someClick} cardClass={'resCard'} cards={ [{text:'ala bala portocalaa', type:'white'}, {text:'ala bala portocalaa', type:'white'}, {text:'alaa balaa portocalaaa', type:'white'}] } />
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <div className={classes.sideHustle}>
                        <div className={classes.sideHustleTop}>
                            <Burger bgColor={"purple"} click={this.togglePlayerInfo} />
                        </div>
                        <div className={classes.sideHustleBottom}>
                            <Burger bgColor={"purple"} click={this.toggleCardsInfo} />
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Game);