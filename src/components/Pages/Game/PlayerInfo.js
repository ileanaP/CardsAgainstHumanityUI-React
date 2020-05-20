import React from 'react';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles.js';


class playerInfo extends React.Component {

    constructor(props) {
        super(props);

        let open = props.open ? true : false;

        this.state = {
            open: open
        };
    }

    componentWillReceiveProps(props) {
        this.setState({open: props.open});
      }

    close() {
        this.setState({open: false});
    }
    
    render() {
        const { classes } = this.props;

        let drawerClasses = [classes.drawer, classes.drawerRight, classes.drawerX];

        if (this.state.open) {
            drawerClasses.push(classes.drawerOpenX);
        }

        return (
            <nav className={drawerClasses.join(' ')}>
                <CloseIcon onClick={() => this.close()}/>
                <Typography>I want to break free</Typography>
            </nav>
        );
    }
}

export default withStyles(styles)(playerInfo);