import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../lib/styles.js';


function FourOhFour(props){

    const { classes } = props;
   
    return(
        <Box className={classes.centeredBox}>
            <Box>
                <Typography>I'm going back to 404<br/>
                            If it's a 7 hour flight or a 45 minutes drive</Typography>
            </Box>
        </Box>
    );
  }

  export default withStyles(styles)(FourOhFour);