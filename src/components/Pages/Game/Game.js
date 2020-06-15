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
import Pusher from 'pusher-js';

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
            userHand: [],
            activeCardset: 0,
            players: [],
            playersDisplay: "visible",
            roundDisplay: "none"
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

        this.canUserAccessGame().then(stuff => {
            if(!this.allowedToPlay)
            {
                console.log('not allowed to play');
                //this.setState({redirect: '/'});
            }
            else
            {
                this.fetchPlayers().then(stuff => {
                    console.log('stuff');
                });

            }
        });




        const fetchGameData = this.fetchGameData();
        const fetchRoundData = this.fetchRoundData();

        const pusher = new Pusher('444709322b87f8e9e8f1', {
            cluster: 'eu',
            encrypted: true
          });

        let channel = pusher.subscribe("game." + this.state.id);
        
        channel.bind("App\\Events\\PlayerEnter", player => {
            console.log("player enter::: ", player);
            this.addPlayer(player);
        });

        channel.bind("App\\Events\\PlayerLeave", player => {
            console.log("player leave::: ", player);
            this.removePlayer(player);
        });

        Promise.all([ fetchGameData, fetchRoundData]).then((responses) => {

                //this.box == null || this.round == null

                /* const fetchCardData = this.fetchCardData(this.round['card_data']);
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
                }); */
        });
    }

    removePlayer(player){
        let players = this.state.players;
        players = players.filter(p => (p.id != player.id && p.name != player.name));
        
        this.setState({players: players});
    }

    addPlayer(player){
        let players = this.state.players;
        players.push(player);

        this.setState({players: players});
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

    async fetchPlayers(){
        await Axios.get(global.api + 'games/' + this.state.id + '/users')
            .then(data => {

                let players = data['data'].map((elem) => {
                    return {id: elem.id, name: elem.name}
                });

                this.setState({
                    players: players
                });
            })
            .catch(error => {
                console.log("fetchPlayers error");
                //this.setState({redirect: '/'});
            });
    }

    async fetchGameData() {
        await Axios.get(global.api + 'games/' + this.state.id)
            .then(data => {
                console.log(data['data']);
                this.box = data['data'];
                //this.setState({box: [ data['data'] ] });
            })
            .catch(error => {
                console.log("fetchGameData error");
                //this.setState({redirect: '/'});
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

    updateGame = (id) => {
        this.setState({
            activeCardset: (this.state.activeCardset == id) ? 0 : id
        });
    }
    
    render() {        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item>
                    <div className={"players"} style={{display: this.state.playersDisplay}}>
                        <Box className={classes.centeredBox}>
                            <Box clone pt={2} pr={1} pb={1} pl={2} width={400} height={500}>
                                <Paper elevation={3} style={{textAlign: "center"}}>
                                    <p className={classes.fancyTitle}>Players</p>
                                    {this.state.players.map((player) => {
                                        return(
                                            <li>{player.name}</li>
                                        );
                                    })}
                                </Paper>
                            </Box>
                        </Box>
                    </div>
                    <div className={"round"} style={{display: this.state.roundDisplay}}>
                        <PlayerInfo open={this.state.playerInfoOpen} close={this.togglePlayerInfo}/>
                        <CardsInfo open={this.state.cardsInfoOpen} close={this.toggleCardsInfo} 
                            userHand={this.state.userHand} />
                        <Grid container>
                            <Grid item xs={3}>
                                <Grid container>
                                    <Grid item>
                                        <Card text={"ala balla"} type="black" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container>
                                    {([...Array(6).keys()]).map( (card) => {
                                        if(card == 0)
                                            return (<div></div>);
                                        
                                        let cardss;

                                        switch(card % 3)
                                        {
                                            case 0: cardss = [{text:'ala bala portocalaa', type:'white'}, 
                                                                {text:'ala bala portocalaa', type:'white'}, 
                                                                {text:'alaa balaa portocalaaa', type:'white'}];
                                                    break;
                                            case 1: cardss = [{text:'ala bala portocalaa', type:'white'}, 
                                                    {text:'alaa balaa portocalaaa', type:'white'}];
                                                    break;
                                            case 2: cardss = [{text:'alaa balaa portocalaaa', type:'white'}];
                                                    break;
                                        }
                                        return (
                                            <Grid item>
                                                <CardSet playerId={card} onClick={this.updateGame}
                                                    selected={this.state.activeCardset == card ? true : false} 
                                                    cardClass={'resCard'} cards={ cardss } />
                                            </Grid>
                                        );
                                    })}
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
                </Grid>
                <Grid item style={{position: "fixed", bottom: "0", left: "30"}}>
                    <Btn bgColor={"gray"} text={"Leave Game"}
                        onClick={this.props.leaveGame} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Game);