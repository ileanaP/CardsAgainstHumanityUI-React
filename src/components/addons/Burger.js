import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../lib/styles.js';

function Burger(props)
{
    const { classes } = props;

    let backgroundColor = props.bgColor ? props.bgColor : "";

    return (
        <button className={classes.toggleButton} onClick={props.click}>
            {([...Array(3).keys()]).map((box, idx) => {
                    return (
                        <div className={classes.toggleButtonLine} 
                            style={{backgroundColor: backgroundColor}}></div>
                    );
                })}
        </button>
    );
}

export default withStyles(styles)(Burger);