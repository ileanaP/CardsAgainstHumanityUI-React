import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles.js';

function drawerToggleButton(props)
{
    const { classes } = props;

    return (
        <button className={classes.toggleButton} onClick={props.click}>
            <div className={classes.toggleButtonLine}></div>
            <div className={classes.toggleButtonLine}></div>
            <div className={classes.toggleButtonLine}></div>
        </button>
    );
}

export default withStyles(styles)(drawerToggleButton);