import React from 'react';
import Axios from 'axios';

function LeaveGame(props) {

    let { classes } = props;

    let visibility = props.visibility ? 'visible' : 'hidden';

    return(
        <Box className={classes.centeredBox} style={{visibility: visibility}}>
            <Paper elevation={3} className={classes.warningPaper}>
                {props.text}
            </Paper>
        </Box>
    );
}

export default withStyles(styles)(NotifMsg);