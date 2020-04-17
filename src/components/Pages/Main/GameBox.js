import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Btn from '../../addons/Btn';

const styles = {
    textfieldPadding: {
        paddingTop: '25px',
        fontStyle: 'italic',
        fontSize: 12
    },
    btnPadding: {
        paddingTop: '20px'
    },
    btnRoot: {
        backgroundColor: 'purple',
        color: 'whitesmoke',
        '&:hover': {
            backgroundColor: 'white',
            color: 'purple'
        },
        '&:active': {
        backgroundColor: 'white',
        color: 'purple'
        },
        marginBottom: '24px',
        padding: '16px',
        width: 200,
        fontWeight: 'bold'
    },
    balanceBox: {
        margin: '15px',
        display: 'inline-block',
        ['@media (max-width:768px)'] : {
            margin: '0 auto'
        }
    },
}

function GameBox(props) {

    const { classes } = props;

    return(
        <Box clone pt={2} pr={1} pb={1} pl={2} width={300}
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
                        <Typography>This is game name</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" wrap="nowrap" className={classes.textfieldPadding}>
                    <Grid item className={classes.paddingTop}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container justify="flex-start" spacing={1} className={classes.btnPadding}>
                    <Grid item>
                        <Box pt={2}>
                            <Button variant="contained" className={classes.btnRoot}>
                                Enter Game
                            </Button>
                            <Btn bgColor={"green"}/>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            
        </Box>
    );
}

export default withStyles(styles)(GameBox);