import React, { Component } from 'react';
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
import { styles } from '../../styles.js';

function GameBox(props) {

    const { classes } = props;
    
    return(
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
                            <Btn bgColor={"purple"} text={"Enter Game"}/>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            
        </Box>
    );
}

export default withStyles(styles)(GameBox);