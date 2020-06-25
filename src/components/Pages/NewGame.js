import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../lib/styles.js';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PaperWhite from '../addons/PaperWhite';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Axios from 'axios';
import { notif } from '../../lib/utils';
import Btn from '../addons/Btn';

class NewGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cardsets: []
        }

        this.name = "";
        this.password = "";
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.spacesNotif = false;

        this.cardsetsToSend = []
    }

    componentDidMount() {
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

            this.cardsetsToSend = cardsets.map((stuff) => {
                return stuff.id;
            })

            this.setState({
                cardsets: data["data"]
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

            console.log(data);

            await Axios.post(global.api + 'games', data)
                .then(data => {
                    console.log(data["data"]);
                })
                .catch(err => {
        
                });
        }
    }

    toggleCardset = (cardset) => {
        cardset = Number(cardset);

        if(this.cardsetsToSend.includes(cardset))
            this.cardsetsToSend = this.cardsetsToSend.filter(x => x != cardset)
        else
            this.cardsetsToSend.push(cardset);

        console.log(this.cardsetsToSend);
    }

    render() {

        let warningText = ''
        let warningClass = ''

        const { classes } = this.props;
   
        let content = () => {
            return(
            <form noValidate autoComplete="off">
                <Grid item style={{height:"80%"}}>
                    <Grid container spacing={2} alignItems="center" wrap="nowrap" direction={'column'}>
                        <Grid item>
                            <p className={classes.fancyTitle}>New Game</p>
                        </Grid>
                        <Grid item>
                        <TextField id="standard-basic" label="Name" onChange={(e) => {this.onChange(e)}}
                                className={classes.formItem} name="name" />
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" label="Password" onChange={(e) => {this.onChange(e)}}
                                    className={classes.formItem} name="password" />
                        </Grid>
                        <Grid item>
                            <div className={classes.boxCardset}>
                                {
                                this.state.cardsets.map((cardset) => {
                                    return(
                                        <FormControlLabel
                                            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} 
                                                            defaultChecked={true} onChange={() => {this.toggleCardset(cardset.id)}}/>}
                                            label={cardset.name}
                                        />
                                    )
                                })
                                }
                            </div>
                        </Grid>
                        <Grid item>
                            <Btn bgColor={"darkred"} text={"Start Game"}
                                    onClick={() => {this.startGame()}}  />
                        </Grid>
                    </Grid>

                </Grid>                
            </form>);
        }

        return(
            <PaperWhite content={content}/>
        );
    }
  }

  export default withStyles(styles)(NewGame);