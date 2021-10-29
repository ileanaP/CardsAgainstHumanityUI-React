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
import PaperWhite from '../../addons/PaperWhite';
import CardsInfo from './CardsInfo';
import PlayerInfo from './PlayerInfo';
import Card from './Card';
import CardSet from './CardSet';
import GameIntro from './GameIntro';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../../lib/styles.js';
import Burger from '../../addons/Burger';
import { useParams, Redirect } from "react-router-dom";
import Pusher from 'pusher-js';
import {inArray, removeDuplicates, notif, leaveGame, removePlayer, fromStorage, toStorage} from '../../../lib/utils';
import Tenor from '../../../lib/img/tenor.gif';

class Game extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        let idNr = !isNaN(id) ? Number(id) : 0;
        let user = fromStorage('userData');
        user.creator = undefined;
        user.confirmed = false;

        this.state = {
            id: idNr,
            display: 'none',
            playerInfoOpen: false,
            cardsInfoOpen: false,
            user: user,
            activeCardset: 0,
            players: [],
            playersDisplay: "none",
            roundDisplay: "none",
            loadingDisplay: "block",
            game: [],
            stateStuff: "template",
            confirmedPlayers: 0,
            handCards: [],
            showHandCards: false,
            currBlackCard: null,
            blackCardsCounter: -1,
            currWhiteCards: [],
            whiteCardsCounter: -1,
            selectedWhiteCard: -1,
            currTsar: -1,
            tsars: [],
            cardsAlreadySent: false
        }

        this.round = null;
        this.cards = {white: null, black: null};
        this.cicle = 0;
        this.allowedToPlay = true;
    }

    togglePlayerInfo = () => {
        let playerInfoOpen = !this.state.playerInfoOpen;
        this.setState({playerInfoOpen : playerInfoOpen});
    }

    toggleCardsInfo = (def = undefined) => {
        let x = def != undefined ? (def ? true : false) : !this.state.cardsInfoOpen;

        this.setState({cardsInfoOpen : x});
    }

    async componentDidMount() {
        this.subscribe();       
    }

    async getCurrUserCardData(roundId) {
        await Axios.get(global.getCurrUserCardData(this.round['id']))
        .then(data => {

            let playerCards = JSON.stringify(data['data'][this.state.user.id]);

            this.setWhiteCards(playerCards);

        })
        .catch(error => {
            console.log(error);
        });
    }

    setCards = () => {

        /* const fetchCardData = this.fetchCardData(this.round['card_data']);
        const fetchPlayerCards = this.fetchPlayerCards(this.round['id']);

        Promise.all([ fetchCardData, fetchPlayerCards]).then((responses) => {
            if(this.cards == null || this.userCards == null)
            {
                //this.setState({redirect: '/' });
            }
            else
            {
                let currWhiteCards = this.cards['white'].slice(0,10);
                this.cards['white'] = this.cards['white'].slice(10, this.userCards.length);
                
                let tsars = JSON.parse(this.round['tsars']);

                this.setState({
                    currWhiteCards: currWhiteCards,
                    tsars: tsars
                });
            }
        });  */
    }

    subscribe() {
        const pusher = new Pusher('XXX', {
            cluster: 'eu',
            encrypted: true
          });

        let channel = pusher.subscribe("game." + this.state.id);

        

        channel.bind("App\\Events\\GameEnded", game => {
            console.log("game ended::: ", game);

            if(!this.state.user.creator)
            {
                notif("Game was ended. Blame it on the boogie. <br/>\
                    You shall be returned to the games hub.");
            }

            this.state.user.game = null;
            toStorage('userData', JSON.stringify(this.state.user));

            setTimeout(() => {
                this.setState({redirect: "/"});
            }, 5000);
        });

        

        channel.bind("App\\Events\\StartRound", data => {
           console.log("StartRound::: ", data);

            let blackCards = data['round']['card_data'];

            this.setBlackCards(blackCards);

            //sent this to setBlackCards
            /* this.fetchCardData(blackCards).then(data => {
                blackCards = JSON.parse(blackCards);

                this.cards['black'] = blackCards.map(x => {
                    let res = data.filter(xx => (xx.id == x))
                    res = {
                        id: res[0].id,
                        text: res[0].text,
                        pick: res[0].pick
                    }
                    return res;
                });

                this.setState({
                    currBlackCard: this.cards['black'][0],
                    blackCardsCounter: 0,
                    playersDisplay: "none",
                    roundDisplay: "block"
                });
            }); */
        });

        channel.bind("App\\Events\\RoundCards", data => {
            console.log("RoundCards::: ", data);

            let playerCards = JSON.stringify(data['cards'][this.state.user.id]);

            this.setWhiteCards(playerCards);
        });

        channel.bind("App\\Events\\UserSentCard", data => {
            console.log("UserSentCard::: ", data);

            let userId           = this.state.user.id;
            let handCards        = this.state.handCards;
            let cardsInfoOpen    = this.state.cardsInfoOpen;
            let currWhiteCards   = this.state.currWhiteCards;
            let confirmedPlayers = this.state.confirmedPlayers;
            
            let incomingUserId = data['user_id'];
            let incomingCards = JSON.parse(data['cards']); 
            let incomingUserAlreadySentCards = data['alreadySent'];


            let incomingCardsIds = [];

            incomingCards.forEach((card)=> {
                incomingCardsIds.push(card.id);
            });

            if(incomingUserAlreadySentCards && userId == incomingUserId)
            {
                notif({msg: "You already sent white card(s) for this black card.", type: "deepgreen"});

                currWhiteCards = currWhiteCards.map(x => {
                    x.active          = false;
                    x.alreadySelected = inArray(x.id, incomingCardsIds) ? true : false;
                    return x;
                });

                this.setState({
                    currWhiteCards: currWhiteCards
                });
            }

            let handCard = {
                user_id: incomingUserId,
                cards: incomingCards
            }

            handCards.push(handCard);
            handCards = removeDuplicates(handCards);
            let cardsSentThisHand = handCards.length;

            let showHandCards = (cardsSentThisHand == confirmedPlayers) && confirmedPlayers ? true : false;

            if(showHandCards && cardsInfoOpen)
            {
                this.toggleCardsInfo(false);
            }

            console.log(handCards);
            
            this.setState({
                handCards: handCards,
                showHandCards: showHandCards
            })
        });
    }

    setWhiteCards = (playerCards) => {
        this.fetchCardData(playerCards).then(data => {

            playerCards = JSON.parse(playerCards);

            this.cards['white'] = playerCards.map(x => {
                let res = data.filter(xx => (xx.id == x))
                res = {
                    id: res[0].id,
                    text: res[0].text,
                    type: "white"
                }
                return res;
            });

            this.setState({
                currWhiteCards: this.cards['white'].slice(0,10),
                whiteCardsCounter: 10
            });
        })
    }

    setBlackCards = (blackCards) => {
        this.fetchCardData(blackCards).then(data => {
            blackCards = JSON.parse(blackCards);

            this.cards['black'] = blackCards.map(x => {
                let res = data.filter(xx => (xx.id == x))
                res = {
                    id: res[0].id,
                    text: res[0].text,
                    pick: res[0].pick
                }
                return res;
            });

            this.setState({
                currBlackCard: this.cards['black'][0],
                blackCardsCounter: 0,
                playersDisplay: "none",
                roundDisplay: "block"
            });
        });
    }

    fetchCardData(cards){

        return Axios.get(global.api + 'cards/' + cards)
            .then(data => {


                return data['data'];
            })
            .catch(error => {
                console.log(error);
            });
    }

    async fetchPlayerCards(round){
        await Axios.get(global.getUserCardsForCurrRound(this.state.user['id'],round))
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

    startRound = async () => {
        await Axios.post(global.getGameRoundData(this.state.id))
            .then(data => {
                this.round = data["data"];

                console.log(this.round);

/*                 this.fetchPlayerCards(this.round.id).then(e => {
                }); */

/*                 this.setState({
                    playersDisplay: "none",
                    roundDisplay: "block"
                }); */
            })
            .catch(error => {

            });
    }

    tryGetCurrentRound = async () => {
        let gameId = this.state.id;

        await Axios.get(global.tryGetGameRoundData(gameId))
            .then(data => {
                
                let round = data["data"];

                if(round != '')
                {
                    this.round = data["data"];

                    /* this.setState({
                        playersDisplay: "none",
                        roundDisplay: "block"
                    }); */
                }
            })
            .catch(error => {

            });
    }

    confirm = async (player) => {
        await Axios.post(global.api + 'games/' + this.state.id + '/users/' + player.id + '/confirm')
            .then(data => {
                //
            })
            .catch(error => {

            });

    }

    eject = (player) => {
        removePlayer(player.id, this.state.game.id);
    }

    sendCards = async (cards) => {

        let cardsData = {
            cards: JSON.stringify(cards),
            currBlackCardNr: this.state.blackCardsCounter
        }

        await Axios.post(global.api + 'rounds/' + this.round.id + '/users/' + this.state.user.id + '/cards', cardsData);
    }

    render() {
        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { classes } = this.props;

        /* let creator = this.state.players.find(obj => {
            return obj.id === this.state.user.id
          })[0];

        */

        let actionButton;
        
        if(this.state.user.creator !== undefined)
        {
            if(this.state.user.creator)
            {
                let game = this.state.game;
                actionButton = <Btn bgColor={"darkred"} text={"End Game"}
                                    onClick={() => {this.props.endGame(game)}} />
            }
            else
                actionButton = <Btn bgColor={"gray"} text={"Leave Game"}
                                    onClick={() => { leaveGame() }} />
        }

        let GMActionBtn;

        if(this.state.user.creator)
            if(this.state.confirmedPlayers == this.state.players.length)
            {
                GMActionBtn = <Btn bgColor={"gray"} text={"Start Round"} className={classes.startRound}
                                onClick={() => {this.startRound() }} />
            }
            else
            {
                GMActionBtn = <Btn bgColor={"gray"} text={"Ping Ppl to Confirm"} className={classes.startRound}
                                onClick={() => {this.pingPlayersToConfirm()}} />
            }

        let blackCard;
        let cardsInfo;

        if(this.state.currBlackCard != null && this.state.currWhiteCards.length != 0)
        {
            blackCard = <Card text={this.state.currBlackCard.text} type="black" />;
            cardsInfo = <CardsInfo open={this.state.cardsInfoOpen} close={this.toggleCardsInfo} 
                            cards={this.state.currWhiteCards} sendCards={this.sendCards} 
                            pick={this.state.currBlackCard.pick}
                            cardsAlreadySent={this.state.cardsAlreadySent}/>
        }

        let handCards = this.state.showHandCards ? this.state.handCards : [];

        let isTsar = this.state.user.id == this.state.tsars[this.state.currTsar] ? true : false;

        let tsarOnClick = isTsar ? (x) => { this.updateGame(x) } : (x) => {}

        

        return (
            <Grid container>
                <p>{this.state.stateStuff}</p>
                <div style={{margin: "0 auto", display: this.state.loadingDisplay}}>
                    <img src={Tenor} width="200px" />
                </div>
                <Grid item style={{width:"100%"}}>
                    <div className={"players"} style={{display: this.state.playersDisplay}}>
                        <GameIntro id={this.state.id} players={this.state.players}/>
                    </div>
                    <div className={"round"} style={{display: this.state.roundDisplay}}>
                        <PlayerInfo open={this.state.playerInfoOpen} close={this.togglePlayerInfo}/>
                        {cardsInfo}
                        <Grid container>
                            <Grid item xs={3}>
                                <Grid container>
                                    <Grid item>
                                        {blackCard}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container>
                                    {handCards.map( (handCard) => {
                                        return (
                                             <Grid item>
                                                <CardSet playerId={handCard['user_id']} onClick={() => {tsarOnClick(handCard['user_id'])}}
                                                    selected={this.state.activeCardset == handCard['user_id'] ? true : false} 
                                                    cardClass={'resCard'} cards={ handCard['cards'] } />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                
                            </Grid>
                            <div className={classes.sideHustle}>
                                <div className={classes.sideHustleTop}>
                                    <Burger bgColor={"purple"} click={this.togglePlayerInfo} purpose={"playerInfo"}/>
                                </div>
                                <div className={classes.sideHustleBottom}>
                                    <Burger bgColor={"purple"} click={this.toggleCardsInfo} purpose={"cardsInfo"}/>
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