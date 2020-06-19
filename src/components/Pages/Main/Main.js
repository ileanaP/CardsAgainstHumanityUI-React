import React, { Component, Fragment } from 'react';
import Side from '../../Side/Side';
import GameBoxes from './GameBoxes';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Btn from '../../addons/Btn';
import { styles } from '../../../lib/styles.js';
import {leaveGame} from '../../../lib/utils';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

class Main extends Component {

    constructor(props){
        super(props);

        console.log(localStorage.getItem('loggedIn'));
        console.log(localStorage.getItem('userData'));

        let user = JSON.parse(localStorage.getItem('userData'));

        let loggedIn = user != null ? true : false;
        let game = loggedIn ? user['game'] : null;

        this.state = {
            game: game,
            loggedIn: loggedIn
        }
    }

    render(){
        let action;

        let game = this.state.game;
        let loggedIn = this.state.loggedIn;
        let disabled = !loggedIn;

        switch(true) {
            case game == null && loggedIn:
                action = <Btn bgColor={"indigo"} text={"New Game"}/>
                break;
            case game != null && loggedIn:
                action = <Fragment>
                            <Btn bgColor={"pink"} text={"Already In Game; Enter"}
                                 href={"/game/" + game}/>
                            <Btn bgColor={"gray"} text={"Leave Game"}
                                 onClick={() => {leaveGame().then(data => {history.go(0)})}}/>
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