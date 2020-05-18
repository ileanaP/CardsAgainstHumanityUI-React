import React, { Component, Fragment } from 'react';
import Side from '../../Side/Side';
import GameBoxes from './GameBoxes';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Btn from '../../addons/Btn';
import { styles } from '../../styles.js';
import Axios from 'axios';


class Main extends Component {

    async leaveGame(user, game) {

        let tmpUser = JSON.parse(localStorage.getItem('userData'));
        let tmpGame = user != undefined ? user['game'] : null;

        if(tmpUser != user || tmpGame != game)
            return;

        await Axios.get('http://cardsagainsthumanity.test/api/games/' + this.state.id + '/users/' + user['id'])
        .then(data => {
            console.log('ok');
        })
        .catch(error => {
            this.setState({redirect: '/'});
        });
    }

    render(){
        
        let action;

        let user = JSON.parse(localStorage.getItem('userData'));

        let game = user != undefined ? user['game'] : null;

        let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

        let disabled = !loggedIn;
        

        console.log('game', game);
        console.log('loggedIn', JSON.parse(localStorage.getItem('loggedIn')));

        switch(true) {
            case game == null && loggedIn:
                action = <Btn bgColor={"indigo"} text={"New Game"}/>
                break;
            case game != null && loggedIn:
                action = <Fragment>
                            <Btn bgColor={"pink"} text={"Already In Game; Enter"}
                                 href={"/game/" + game}/>
                            <Btn bgColor={"gray"} text={"Leave Game"}
                                 onClick={this.leaveGame}/>
                         </Fragment>
                disabled = true;
                break;
            default:
                action = <Btn bgColor={"indigo"} text={"Login to enter game"} href={'login'}/>
          }

        const { classes } = this.props;

        return(
            <div className={classes.Main}>
                <Grid container justify = "center">
                    {action}  
                </Grid>
                <div>
                <GameBoxes disabled={disabled}/>
                </div>
            </div>
        );        
    }
}


export default withStyles(styles)(Main);