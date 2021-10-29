import React, { Component, Fragment } from 'react';
import Side from '../../Side/Side';
import GameBoxes from './GameBoxes';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Btn from '../../addons/Btn';
import { styles } from '../../../lib/styles.js';
import { leaveGame, fromStorage } from '../../../lib/utils';

class Main extends Component {

    constructor(props){
        super(props);

        let user = fromStorage('userData');

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
                action = <Btn bgColor={"deepgreen"} text={"New Game"} 
                            link={"/newgame"}/>
                break;
            case game != null && loggedIn:
                action = <Fragment>
                            <Btn bgColor={"deepgreen"} text={"Already In Game; Enter"}
                                 link={"/game/" + game}/>
                            <Btn bgColor={"gray"} text={"Leave Game"}
                                 onClick={() => {leaveGame()}}/>
                         </Fragment>
                disabled = true;
                break;
            default:
                action = <Btn bgColor={"deepgreen"} text={"Login to enter game"} link={'login'}/>
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