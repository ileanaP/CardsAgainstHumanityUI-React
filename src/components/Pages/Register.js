import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Btn from '../addons/Btn';
import NotifMsg from '../addons/NotifMsg';
import { Redirect } from 'react-router-dom';
import { styles } from '../../lib/styles.js';
import Axios from 'axios';
//import Cookies from 'universal-cookie';
import { toStorage, setupUserData } from '../../lib/utils';
import { render } from '@testing-library/react';


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            redirect: ''
        }

        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async register() {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        await Axios.post(global.api + 'register', data)
            .then(data => { 
                setupUserData(data['data']);

                /* const cookies = new Cookies();
                cookies.set('username', data['name'], { path: '/' });
                cookies.set('useremail', data['email'], { path: '/' }); */

                this.props.toggleLoginState();
                this.setState({redirect: '/'});
            })
            .catch(error => {
                this.setState({warningClass: true});
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() 
    {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { classes } = this.props;

        let warningClass = this.state.warningClass ? true : false;

        return(
            <Box className={classes.centeredBox}>
                <Box clone pt={2} pr={1} pb={1} pl={2} width={400} height={0}>
                    <Paper elevation={3}>
                    <NotifMsg type={'warning'} text={"Something went wrong."} visibility={warningClass}/>
                    <form noValidate autoComplete="off">
                    <Grid container spacing={2} alignItems="center" wrap="nowrap" direction={'column'}>
                        <Grid item>
                            <TextField id="standard-basic" name="name" 
                                label="Name" className={classes.formItem} onChange={this.onChange}/>    
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" name="email" 
                                label="Email" className={classes.formItem} onChange={this.onChange}/>
                        </Grid>
                        <Grid item>
                            <TextField id="standard-basic" name="password" 
                                label="Password" className={classes.formItem} type="password" onChange={this.onChange}/>
                        </Grid>
                        <Grid item>
                        <Box pt={3}>
                            <Btn text={"Register"} bgColor={'purple'} onClick={this.register}/> 
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
  }

  export default withStyles(styles)(Register);