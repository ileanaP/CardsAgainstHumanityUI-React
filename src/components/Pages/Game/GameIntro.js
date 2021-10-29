import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Btn from '../addons/Btn';
import NotifMsg from '../addons/NotifMsg';
import { styles } from '../../lib/styles.js';
import { fromStorage, setupUserData } from '../../lib/utils';
import Axios from 'axios';
//import Cookies from 'universal-cookie';
import WaitRedirect from '../addons/WaitRedirect';


class GameIntro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            players: this.props.players
        }
    }

    async componentDidMount() {
        this.subscribe();

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

                this.fetchGamePlayersData().then(stuff => {
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

    async fetchGamePlayersData() {

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
                console.log("fetchGamePlayersData error");
                //this.setState({redirect: '/'});
            });
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

    subscribe() {
        const pusher = new Pusher('XXXX', {
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

                notif({msg: "You were brutally kicked out", type: "deepgreen"});
                setTimeout(() => {
                    this.setState({redirect: "/"});
                }, 5000);
            }
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
    }

    removePlayer(player){
        let players = this.state.players;
        players = players.filter(p => (p.id != player.id));
        
        this.setState({players: players});
    }

    async fetchPlayers(){
        await Axios.get(global.getGamePlayersURL(this.state.id))
           .then(data => {

               let players = data['data'].map((elem) => {
                   
                   let player;

                   player = {id: elem.id, name: elem.name, confirmed: elem.confirmed, creator: false};
                   
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

   pingPlayersToConfirm = async () => {
        
    await Axios.post(global.api + 'games/' + this.state.id + '/pingPlayersToConfirm')
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
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

    render() {

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
   
        return(
            <PaperWhite key={"game-paperwhite-1"} content={paperWhiteContent}/>
        );
    }
  }

  export default withStyles(styles)(GameIntro);