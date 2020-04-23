import React, { Component, Fragment } from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'indigo',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'pink',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'indigo',
        },
      },
    },
  })(TextField);

class GameBoxes extends Component {

    constructor(){
        super();

        this.state = {
            boxes: [],
            box: {}
        }
    }

    async componentDidMount() {
        const data = await Axios.get('http://cardsagainsthumanity.test/api/games');

        this.setState({boxes: data['data']});
    }
    
    render(){
        const { classes } = this.props;
        return(
            <Fragment>
                {this.state.boxes.map((box, idx) => {
                    return (
                        <Box clone pt={2} pr={1} pb={1} pl={2} width={300} height={0}
                                    className={classes.balanceBox}>
                            <Paper elevation={3}>
                                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                                    <Grid item>
                                        <Box bgcolor="primary.main" clone>
                                        <Avatar>
                                            <VideogameAsset />
                                        </Avatar>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Typography>{box.name}</Typography>
                                        <Typography className={classes.litterText}>
                                            Created by&nbsp;
                                        </Typography>
                                        <Typography className={`${classes.litterText} ${classes.strongTxt}`}>
                                        <Link to={"/user?id=" + box.creator.id} className={classes.noDec}>
                                            {box.creator.name}
                                        </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" wrap="nowrap" className={classes.textfieldPadding}>
                                    <Grid item className={classes.paddingTop}>
                                        <CssTextField id="outlined-basic"
                                            className={classes.margin}
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            id="custom-css-outlined-input"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justify="flex-start" spacing={1} className={classes.btnPadding}>
                                    <Grid item>
                                        <Box pt={2}>
                                            <Btn bgColor={"purple"} text={"Enter Game"} href={"/game?id=" + box.id }/>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                            
                        </Box>
                    );
                })}
            </Fragment>
        );
    }
}

export default withStyles(styles)(GameBoxes);