import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Btn from '../addons/Btn';
import { styles } from '../styles.js';


function Register(props){

  const { classes } = props;

    return(
        <Box className={classes.centeredBox}>
            <Box clone pt={2} pr={1} pb={1} pl={2} width={400} height={0}>
                <Paper elevation={3}>
                <form noValidate autoComplete="off">
                <Grid container spacing={2} alignItems="center" wrap="nowrap" direction={'column'}>
                <Grid item>
                    <TextField id="standard-basic" label="Name" className={classes.formItem} />    
                    </Grid>
                    <Grid item>
                    <TextField id="standard-basic" label="Email" className={classes.formItem} />    
                    </Grid>
                    <Grid item>
                    <TextField id="standard-basic" label="Password" className={classes.formItem} type="password"/>
                    </Grid>
                    <Grid item>
                    <Box pt={3}>
                        <Btn text={"Register"} bgColor={'purple'}/> 
                    </Box>
                    </Grid>
                    <Grid item>
                    <Box pb={3} alignItems="center" justifyContent="center">
                        <Typography align="center" className={classes.litterText}>Already have an account?</Typography>
                        <Typography align="center"><a href="/login" className={classes.commonerLink}>Login</a></Typography>
                    </Box>
                    </Grid>
                </Grid>
                </form>  
                </Paper>
                
            </Box>
        </Box>
    );
  }

  export default withStyles(styles)(Register);