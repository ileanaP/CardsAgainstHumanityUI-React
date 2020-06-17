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
import { styles } from '../../../lib/styles.js';
import Burger from '../../addons/Burger';
import { useParams, Redirect } from "react-router-dom";
import Pusher from 'pusher-js';
import {removeDuplicates, notif} from '../../../lib/utils';

class Game extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        let idNr = !isNaN(id) ? Number(id) : 0;
        let user = JSON.parse(localStorage.getItem('userData'));
        user.creator = undefined;
        user.confirmed = false;

        this.state = {
            id: idNr,
            display: 'none',
            playerInfoOpen: false,
            cardsInfoOpen: false,
            cards: [],
            user: user,
            userHand: [],
            activeCardset: 0,
            players: [],
            playersDisplay: "visible",
            roundDisplay: "none",
            game: []
        }

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

        this.subscribe();

        this.canUserAccessGame().then(stuff => {
            if(!this.allowedToPlay)
            {
                console.log('not allowed to play');
                return;
            }

            this.fetchPlayers().then(stuff => {
                let players = this.state.players.map((obj) => {
                    if(obj.id == this.state.game.creator_id)
                    {
                        obj.creator = true;
                    }
                    return  obj;
                });

                this.setState({
                    players: players
                });

                this.fetchGameData().then(stuff => {
                    let user = this.state.user;
                    
                    user.creator = (this.state.user.id == this.state.game.creator_id) ? true : false;

                    this.setState({user: user});
                });

            });

            Promise.all([ this.fetchPlayers(), this.fetchGameData()]).then((responses) => {
                
            });
        });




        const fetchGameData = this.fetchGameData();
        const fetchRoundData = this.fetchRoundData();

        Promise.all([ fetchGameData, fetchRoundData]).then((responses) => {

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

    subscribe() {
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

        channel.bind("App\\Events\\GameEnded", game => {
            console.log("game ended::: ", game);
            notif("Game was ended. Blame it on the boogie. <br/>" +
                        "You shall be returned to the games hub.");
            setTimeout(() => {
                this.setState({redirect: "/"});
            }, 5000);
        });
    }

    removePlayer(player){
        let players = this.state.players;
        players = players.filter(p => (p.id != player.id && p.name != player.name));
        
        this.setState({players: players});
    }

    addPlayer(player){
        let players = this.state.players;

        player.creator = false;
        player.confirmed = false;

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
                    return {id: elem.id, name: elem.name, creator: false}
                });

                players = this.state.players.concat(players);
                players = removeDuplicates(players);

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
                this.setState({game: data['data'] });
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

    startRound = () => {
        console.log("startRound is called :o");
    }

    confirm = async (player) => {

    }

    eject = () => {
        
    }

    constructPlayerLine = (player) => {
        let link;

        if(player.id == this.state.user.id && !player.confirmed)
        {
            link = <a onClick={this.confirm(player)} href="#">(confirm)</a>; 
        }
        else
        {
            console.log(this.state.user.creator && this.state.user.confirmed + "~~");
            if(this.state.user.creator && this.state.user.confirmed)
                link = <a onClick={this.eject(player)} href="#">(eject)</a>;
            else
            {
                if(!player.confirmed && this.state.user.id == player.id)
                    link = <a onClick={this.confirm(player)} href="#">(confirm)</a>;
                else
                    link = "";
            }
        }

        let firstPart = player.name + (player.creator ? " (GM)" : "");
        
        return (<div>{firstPart} {link}</div>);
    }

    yesAction = () => {
        console.log("yep this was literally called :/ ");
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { classes } = this.props;

        /* let creator = this.state.players.find(obj => {
            return obj.id === this.state.user.id
          })[0];

        
        console.log(creator);
        console.log("~~~~~~~~~"); */

        let actionButton;
        
        if(this.state.user.creator !== undefined)
        {
            if(this.state.user.creator)
                actionButton = <Btn bgColor={"darkred"} text={"End Game"}
                                    onClick={this.props.endGame} />
            else
                actionButton = <Btn bgColor={"gray"} text={"Leave Game"}
                                    onClick={this.props.leaveGame} />
        }

        return (
            <Grid container>
                <Grid item style={{width:"100%"}}>
                    <div className={"players"} style={{display: this.state.playersDisplay}}>
                        <Box className={classes.centeredBox}>
                            <Box clone pt={2} pr={1} pb={1} pl={2} width={400} height={500}>
                                <Paper elevation={3} style={{textAlign: "center"}}>
                                    <Grid container direction="column" style={{height:"100%"}}>
                                        <Grid item style={{height:"80%"}}>
                                            <div style={{display: "inlineBlock", height: "190px"}}>
                                                <p className={classes.fancyTitle}>Players</p>
                                                {this.state.players.map((player) => {
            


                                                    let playerLine = this.constructPlayerLine(player);

                                                    return(
                                                        <li className={player.creator ? classes.creatorClass : ''}
                                                                style={{listStyleType: "none"}}>
                                                                    {playerLine}
                                                        </li>
                                                    );

                                                })}
                                            </div>
                                            <p className={classes.fancyTitle}>Stats</p>
                                        </Grid>
                                        <Grid item style={{height:"20%"}}>
                                            <Btn bgColor={"gray"} text={"Start Round"} className={classes.startRound}
                                            onClick={this.startRound} />
                                        </Grid>
                                    </Grid>
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
                    {actionButton}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Game);