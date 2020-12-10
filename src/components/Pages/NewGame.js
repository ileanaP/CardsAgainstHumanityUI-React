import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../lib/styles.js';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PaperWhite from '../addons/PaperWhite';
import WaitRedirect from '../addons/WaitRedirect';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Axios from 'axios';
import { notif, fromStorage, toStorage } from '../../lib/utils';
import Btn from '../addons/Btn';

class NewGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cardsets: [],
            default: true,
            toggleSelect: "(deselect all)"
        }

        this.user = fromStorage('userData');

        this.name = "";
        this.password = "";
        this.spacesNotif = false;

        this.cardsetsToSend = []
    }

    componentDidMount() {
        
        if(this.user.game != null)
        {
            this.setState({redirect: "/"});
        }

        this.getCardsets();
    }

    onChange = (e) => {

        if(e.target.name == "password" && e.target.value[e.target.value.length -1] == " ")
        {
            if(!this.spacesNotif)
            {
                notif("No spaces are allowed");
                this.spacesNotif = " ";
            }
            e.target.value = e.target.value.slice(0, e.target.value.length -1);
        }
        
        this[e.target.name] = e.target.value;
    }

    getCardsets = async () => {
        await Axios.get(global.api + 'cardsets')
        .then(data => {
            let cardsets = data["data"];

            cardsets = cardsets.map(e => {e.checked = true; return e;});

            this.cardsetsToSend = cardsets.map((stuff) => {
                return stuff.id;
            })

            this.setState({
                cardsets: cardsets
            });

        })
        .catch(error => {
            console.log(error);
        })
    }

    startGame = async () => {

        if(this.name == "" || this.password == "" || this.state.cardsets.length < 10)
            notif("You did not fill all required stuff");
        else
        {
            let cardsets = this.state.cardsets.map(e => {return e.id;})
            cardsets = JSON.stringify(cardsets);

            const data = {
                creator_id: this.user.id,
                name: this.name,
                password: this.password,
                cardsets: cardsets
            }

            await Axios.post(global.api + 'games', data)
                .then(data => {
                    let game = data["data"];

                    this.user.game = game.id;
                    toStorage('userData', JSON.stringify(this.user));

                    this.setState({
                        redirect: "/game/" + game.id
                    });
                })
                .catch(err => {
                    if(err.response !== undefined)
                    { 
                        if(err.response.status == 403)
                            notif(err.response.data.error);
                        
                        if(err.response.status == 422)
                            notif("Validation failed");

                    }
                    else
                    {
                        console.log(err);
                    }
                });
        }
    }

    toggleCardset = (e, cardset) => {

        cardset = Number(cardset);

        let cardsets = this.state.cardsets.map(es => {
            es.checked = es.id == cardset ? e.target.checked : es.checked;
            return es;
        });

        if(this.cardsetsToSend.includes(cardset))
            this.cardsetsToSend = this.cardsetsToSend.filter(x => x != cardset)
        else
            this.cardsetsToSend.push(cardset);

        this.setState({
            cardsets: cardsets
        });
    }

    toggleSelect = () => {
        let defaultt = !this.state.default;

        let cardsets = this.state.cardsets.map(e => {
            e.checked = defaultt;
            return e;
        });

        this.setState({
            default: defaultt,
            cardsets: cardsets,
            toggleSelect: defaultt ? "(deselect all)" : "(select all)"
        });
    }

    render() {

        if (this.state.redirect) {
            return  <WaitRedirect link={this.state.redirect} ms={0} />
        }

        let warningText = ''
        let warningClass = ''

        const { classes } = this.props;
   
        let content = () => {
            return(
            <form noValidate autoComplete="off">
                <Grid key={"newgame-grid-1"} item style={{height:"80%"}}>
                    <Grid key={"newgame-grid-2"} container spacing={2} alignItems="center" wrap="nowrap" direction={'column'}>
                        <Grid key={"newgame-grid-3"} item>
                            <p className={classes.fancyTitle}>New Game</p>
                        </Grid>
                        <Grid key={"newgame-grid-4"} item>
                        <TextField key={"newgame-textfield-1"} id="standard-basic" label="Name" onChange={(e) => {this.onChange(e)}}
                                className={classes.formItem} name="name" />
                        </Grid>
                        <Grid key={"newgame-grid-5"} item>
                            <TextField id="standard-basic" label="Password" onChange={(e) => {this.onChange(e)}}
                                    className={classes.formItem} name="password" />
                        </Grid>
                        <Grid key={"newgame-grid-6"} item>
                            <div  key={"newgame-div-1"}  className={classes.boxCardset}>
                                <div key={"newgame-div-2"} style={{float:"right", marginTop:"10px"}}>
                                    <Link key={"newgame-link-1"} className={classes.toggleSelect} onClick={() => {this.toggleSelect()}}>{this.state.toggleSelect}</Link>
                                </div>
                                <div key={"newgame-div-3"} style={{clear:"both"}}></div>
                                {
                                this.state.cardsets.map((cardset, idx) => {
                                    return(
                                        <FormControlLabel key={"newgame-label-" + idx}
                                            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} 
                                                            defaultChecked={true} checked={cardset.checked} onChange={(e) => {this.toggleCardset(e, cardset.id)}}/>}
                                            label={cardset.name}
                                        />
                                    )
                                })
                                }
                            </div>
                        </Grid>
                        <Grid key={"newgame-grid-7"} item>
                            <Btn key={"newgame-btn-8"} bgColor={"darkred"} text={"Start Game"}
                                    onClick={() => {this.startGame()}}  />
                        </Grid>
                    </Grid>

                </Grid>                
            </form>);
        }

        return(
            <PaperWhite key={"newgame-paperwhite-1"} content={content}/>
        );
    }
  }

  export default withStyles(styles)(NewGame);