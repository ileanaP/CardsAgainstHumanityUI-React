import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../lib/styles.js';
import Box from '@material-ui/core/Box';
import NotifMsg from '../addons/NotifMsg';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PaperWhite from '../addons/PaperWhite';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Axios from 'axios';

class NewGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }

    }

    componentDidMount() {

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    getCardsets = async () => {
        await Axios.get(global.api + 'cardsets')
        .then(data => {
            console.log(data["data"]);
        })
        .catch(error => {

        })
    }

    cardsetList = () => {

        this.getCardsets().then()
        return(
            <div style={{overflow:"scroll", height:"200px", width: "350px", margin: "0 auto" }}>
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                    label="Custom icon"
                />
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                    label="Custom icon"
                />
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                    label="Custom icon"
                />
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                    label="Custom icon"
                />
            </div>
        );
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
                            <NotifMsg type={'warning'} text={warningText} visibility={warningClass}/>
                        </Grid>
                        <Grid item>
                        <TextField id="standard-basic" label="Name" onChange={this.onChange}
                                className={classes.formItem} name="name" />
                        </Grid>
                        <Grid item>
                            {this.cardsetList()}
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