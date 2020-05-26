import React, { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styles } from '../../styles.js';


class  Card extends Component {

    constructor(props){
        super(props);

        let fontSize =  16;

        if(props.type == 'white')
        {
            if(props.text.length > 91)
                fontSize = 12;
        } 
        else
        {
            if(props.text.length > 135)
                fontSize =  14;
        }

        this.state = {
            fontSize: fontSize,
            selected: false
        }
    }

    componentWillReceiveProps(props){
        if(props.selected != this.state.selected)
        {
            this.setState({selected: props.selected});
        }
    }

    render() {

        const { classes } = this.props;

        let click;

        if(typeof this.props.onClick == 'function')
            click = (e) => {this.props.onClick(e)}
        else
            click = () => {};

        let classs = classes[this.props.type + "Card"] + ' '+ this.props.cardClass;

        if(this.state.selected)
            classs += ' '+ classes['selected'];
        else
            classs += ' NOT selected';

        return (
            <Box clone pt={2} pr={1} pb={1} pl={2} 
                className={classs}
                onClick={() => {this.props.onClick(this.props.id)}}>
                <Paper elevation={3}>
                    <Typography style={{fontSize: this.state.fontSize}}>
                        {this.props.text}
                    </Typography>
                </Paper>
                
            </Box>
        );
    }
}


export default withStyles(styles)(Card);