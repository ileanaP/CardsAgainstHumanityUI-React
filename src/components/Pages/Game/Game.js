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
            stateStuff: "userID ~~ " + user.id,
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

        const canUserAccessGame = this.canUserAccessGame();

        this.canUserAccessGame().then(stuff => {
                if(!this.allowedToPlay)
                {
                    console.log("canUserAccessGame redirect");
                    // this.setState({
                    //     redirect: "/"
                    // });
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
                        let players = this.state.players;
                        
                        user.creator = (this.state.user.id == this.state.game.creator_id) ? true : false;
    
                        players = players.map((e) => {
                            if(e.id == this.state.game.creator_id)
                                e.creator = true;
                            return e;
                        });

                        players.sort((a, b) => (!a.creator) ? 1 : -1)

/*                         let tsars = players.map(players => players.id);
                        tsars.sort((a, b) => (a > b) ? 1 : -1) */

                        /* *** DISPLAY ** */
                        // console.log("===============");
                        // console.log(players);
                        // console.log("===============");
                        
                        this.setState({
                            user: user,
                            players: players,
                            playersDisplay: "block",
                            loadingDisplay: "none",
                            currTsar: 0
                        });
    
                        /* *** BEGIN TESTING ** */
                        /* this.setState({
                            user: user,
                            players: players,
                            playersDisplay: "block",
                            loadingDisplay: "none",
                            currTsar: 0,
                            tsars: [578,768,967,2]
                        });
    
                        this.setState({
                            currBlackCard: {id: 116, 
                                            text: "I know when that hotline bling, that can only mean one thing: ____.", 
                                            pick: 1},
                            blackCardsCounter: 0,
                            playersDisplay: "none",
                            roundDisplay: "block"
                        }); 
    
                        this.setState({
                            currBlackCard: {id: 13, 
                                            text: "Step 1: ____. Step 2: ____. Step 3: Profit.", 
                                            pick: 2},
                            blackCardsCounter: 0,
                            playersDisplay: "none",
                            roundDisplay: "block"
                        });
                
                        this.setState({
                            currWhiteCards: [{id: 2280, text: "An immediately regrettable $9 hot dog from the Boston Convention Center.", type: "white"},
                                                {id: 2227, text: "The Genophage.", type: "white"},
                                                {id: 853, text: "An older woman who knows her way around the penis.", type: "white"},
                                                {id: 1851, text: "Antidepressants.", type: "white"},
                                                {id: 2411, text: "A big brain full of facts and sadness.", type: "white"},
                                                {id: 1429, text: "Being a hideous beast that no one could love.", type: "white"},
                                                {id: 1858, text: "Working so hard to have muscles and then having them.", type: "white"},
                                                {id: 703, text: "Running out of semen.", type: "white"},
                                                {id: 1148, text: "Pikies.", type: "white"},
                                                {id: 1708, text: "Lots and lots of abortions.", type: "white"}],
                            whiteCardsCounter: 10
                        }); */
                        /* *** END TESTING **** */
                    });
    
                }); 

                const tryGetCurrentRound = this.tryGetCurrentRound();

                Promise.all([tryGetCurrentRound]).then((responses) => {
                    if(this.round != null)
                    {
                        let blackCards = this.round['card_data'];
                       
                        this.setBlackCards(blackCards);
        
        
                        let roundId = this.round['id'];
                        
                        const getCurrUserCardData = this.getCurrUserCardData();
        
                        Promise.all([getCurrUserCardData]).then((responses) => {
        
                        });
        
                        //setBlackCards
                        //this.setCards();
                    }
                });


        });

        
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

            if(player.id == this.state.user.id)
            {
                this.state.user.game = null;
                toStorage('userData', JSON.stringify(this.state.user));

                notif({msg: "You were brutally kicked out", type: "pink"});
                setTimeout(() => {
                    this.setState({redirect: "/"});
                }, 5000);
            }
        });

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

        channel.bind("App\\Events\\PlayerConfirmed", user => {
            console.log("PlayerConfirmed::: ", user);

            let players = this.state.players;

            players = players.map((e) => {
                if(e.id == user.id)
                    e.confirmed = true;
                return e;
            });

            let userS = this.state.user;

            if(userS.id == user.id)
            {
                userS.confirmed = true;
            }

            this.setState({
                players: players,
                stateStuff: "something",
                user: userS,
                confirmedPlayers: ++this.state.confirmedPlayers
            })
        });

        channel.bind("App\\Events\\PingPlayersToConfirm", data => {
            console.log("PingPlayersToConfirm::: ", data);

            if(!this.state.user.confirmed)
                notif("Don't forget to confirm your presence");
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
                notif({msg: "You already sent white card(s) for this black card.", type: "pink"});

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

    removePlayer(player){
        let players = this.state.players;
        players = players.filter(p => (p.id != player.id));
        
        this.setState({players: players});
    }

    addPlayer(player){
        let players = this.state.players;

        player.creator = false;

        players.push(player);

        let confirmedPlayers = this.state.confirmedPlayers;
        
        confirmedPlayers = player.confirmed ? confirmedPlayers++ : confirmedPlayers;

        this.setState({
            players: players,
            confirmedPlayers: confirmedPlayers
        });
    }

    

    async canUserAccessGame()
    {
        /* *** testing stuff */
        // let user = this.state.user
        // user['game'] = this.state.id;
        // toStorage('userData', JSON.stringify(user));

        // user['confirmed'] = 1;

        // this.setState({
        //     user: user
        // });

        if(!fromStorage('loggedIn'))
        {
            this.allowedToPlay = false;
        }

        let user = this.state.user;
        let gameId = this.state.id;
        let userId = this.state.user['id'];

        await Axios.get(global.getTryUserEnterGameURL(gameId, user['id']))
            .then(data => {
                if(user['game'] != gameId)
                {
                    user['game'] = gameId;
                    toStorage('userData', JSON.stringify(user));
                }
                
                user['confirmed'] = data['data']['confirmed'];

                this.setState({
                    user: user
                });
            })
            .catch(error => {
                if(error.response !== undefined)
                { 
                    if(error.response.status == 403) 
                    {
                        this.allowedToPlay = false;
                    }
                    if(error.response.status == 404) 
                    {
                        this.setState({
                            redirect: "/404"
                        });
                    }
                }
                else
                {
                    console.log(error);
                }
            });
    }

    async fetchPlayers(){
         await Axios.get(global.getGamePlayersURL(this.state.id))
            .then(data => {

                let players = data['data'].map((elem) => {
                    
                    let player;

                    player = {id: elem.id, name: elem.name, creator: false, confirmed: elem.confirmed};
                    
                    return  player;
                });

                players = this.state.players.concat(players);
                players = removeDuplicates(players);

                let confirmedPlayers = players.filter(e => e.confirmed === 1).length;

                let user = this.state.user;
                
                this.setState({
                    players: players,
                    user: user,
                    confirmedPlayers: confirmedPlayers
                });
            })
            .catch(error => {
                console.log("fetchPlayers error");
                //this.setState({redirect: '/'});
            });

            /* *** BEGIN TESTING ** */
            /* this.setState({
                players: [{id:578, name:"Spencer Friesen", creator:true, confirmed: 1},
                            {id:2, name:"Arne Wilderman", creator:false, confirmed: 1},
                            {id:768, name:"Asha Gutmann", creator:false, confirmed: 1},
                            {id:967, name:"Leonie Oberbrunner Jr.", creator:false, confirmed: 1}],
                user: this.state.user,
                confirmedPlayers: 4
            }); */
            /* *** END TESTING **** */
    }

    async fetchGameData() {

        /* *** BEGIN TESTING ** */
        /* this.setState({
            game: {cardsets: "[2,103,134,166,191,235,271,342,398,406,414,417,421,430,437,447,454,459,466,469,476,478,482,485,487,494,499,505,510,517,521,530,533,541,552,560,566,568,572,2131,2152,2374]",
                        created_at: "2020-06-26T11:07:17.000000Z",
                        creator_id: 578,
                        deleted_at: null,
                        id: 37,
                        name: "fsfsdfsfsd",
                        password: "$2y$10$Sfzj/wMmNlM/UrW7ra9ByeI5MD8dJ4gy.GzrI78FgGJz4NgdlB.Bq",
                        updated_at: "2020-06-26T11:07:17.000000Z",
                        winner_id: null
                        }
        }); */
        /* *** END TESTING **** */

        await Axios.get(global.getGameURL(this.state.id))
            .then(data => {
                this.setState({game: data['data'] });
            })
            .catch(error => {
                console.log("fetchGameData error");
                //this.setState({redirect: '/'});
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

    constructPlayerLine = (player) => {
        let link;


        if(player.id == this.state.user.id && !player.confirmed)
        {
            link = <a key={"game-paperwhite-player-a-" + player.id} onClick={() => {this.confirm(player)}} href="#">(confirm)</a>;
        }
        else
        {
            if(this.state.user.creator && this.state.user.confirmed)
            {
                if(this.state.user.id != player.id)
                    link = <a key={"game-paperwhite-player-a-" + player.id} onClick={() => {this.eject(player)}} href="#">(eject)</a>;
                else
                    link = "";
            }
            else
            {
                if(!player.confirmed && this.state.user.id == player.id)
                    link = <a key={"game-paperwhite-player-a-" + player.id} onClick={() => {this.confirm(player)}} href="#">(confirm)</a>;
                else
                    link = "";
            }
        }

        let firstPart = player.name + (player.creator ? " (GM)" : "");
        
        return (<div key={"game-paperwhite-player-div-" + player.id} >{firstPart} {link}</div>);
    }


    pingPlayersToConfirm = async () => {
        
        await Axios.post(global.api + 'games/' + this.state.id + '/pingPlayersToConfirm')
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
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

        let paperWhiteContent = () => {
            return(
            <div>
                <Grid key={"game-paperwhite-grid-1"} item style={{height:"80%"}}>
                    <div key={"game-paperwhite-div-1"} style={{display: "inlineBlock", height: "190px"}}>
                        <p key={"game-paperwhite-p-1"} className={classes.fancyTitle}>Players</p>
                        {this.state.players.map((player, idx) => {
        
                            let playerLine = this.constructPlayerLine(player);
                            
                            let playerClass = player.creator ? classes.creatorClass 
                                                            : (player.confirmed ? classes.confirmedClass : '');

                            return(
                                <li key={"game-paperwhite-li-" + idx} className={playerClass}
                                        style={{listStyleType: "none"}}>
                                            {playerLine}
                                </li>
                            );

                        })}
                    </div>
                </Grid>
                <Grid item style={{height:"20%"}}>
                    {GMActionBtn}
                </Grid>
            </div>
            );
        }

        return (
            <Grid container>
                <p>{this.state.stateStuff}</p>
                <div style={{margin: "0 auto", display: this.state.loadingDisplay}}>
                    <img src={Tenor} width="200px" />
                </div>
                <Grid item style={{width:"100%"}}>
                    <div className={"players"} style={{display: this.state.playersDisplay}}>
                        
                    <PaperWhite key={"game-paperwhite-1"} content={paperWhiteContent}/>
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