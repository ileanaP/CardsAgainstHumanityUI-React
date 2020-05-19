import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Btn from '../addons/Btn';
import NotifMsg from '../addons/NotifMsg';
import { styles } from '../styles.js';
import Axios from 'axios';
//import Cookies from 'universal-cookie';
import WaitRedirect from '../addons/WaitRedirect';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            warning: {
                class: false,
                text: ""
            }
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if(JSON.parse(localStorage.getItem('loggedIn')))
            this.setState({redirect: '/'});
    }

    async login() {
        const data = {
            email: this.state.email.trim(),
            password: this.state.password.trim()
        }

        await Axios.post(global.api + 'login', data)
            .then(data => { 
                data = data['data'];

                let localData = {
                    id: data['id'],
                    name: data['name'],
                    email: data['email'],
                    token: data['token'],
                    game: data['in_game']
                };
                
                localStorage.setItem('userData', JSON.stringify(localData));
                localStorage.setItem('loggedIn', 'true');

                /* const cookies = new Cookies();
                cookies.set('username', data['name'], { path: '/' });
                cookies.set('useremail', data['email'], { path: '/' }); */

                this.props.toggleLoginState();
                this.setState({redirect: '/'});
            })
            .catch(error => {
                let warningText;
                if(error.response.status == 401)
                {
                    warningText = "Username or password are incorrect.";
                }
                else
                {
                    warningText = "Unknown error. Contact server admin.";
                }
                this.setState({warning: {class: true, text: warningText}});

            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        if (this.state.redirect) {
            return  <WaitRedirect link={"/"} ms={0} />
        }

        const { classes } = this.props;

        let warningClass =  this.state.warning.class;
        let warningText = this.state.warning.text;
   
        return(
            <Box className={classes.centeredBox}>
                <Box clone pt={2} pr={1} pb={1} pl={2} width={400} height={0} >
                    <Paper elevation={3}>
                        <NotifMsg type={'warning'} text={warningText} visibility={warningClass}/>
                        <form noValidate autoComplete="off">
                        <Grid container spacing={2} alignItems="center" wrap="nowrap" direction={'column'}>
                            <Grid item>
                            <TextField id="standard-basic" label="Email" onChange={this.onChange} 
                                className={classes.formItem} name="email" />    
                            </Grid>
                            <Grid item>
                            <TextField id="standard-basic" label="Password" onChange={this.onChange}
                                className={classes.formItem} type="password" name="password" />
                            </Grid>
                            <Grid item>
                            <Box pt={3}>
                                <Btn text={"Login"} bgColor={'purple'} onClick={this.login}/> 
                            </Box>
                            </Grid>
                            <Grid item>
                            <Box pb={3} alignItems="center" justifyContent="center">
                                <Typography align="center" className={classes.litterText}>Don't have an account?</Typography>
                                <Typography align="center"><a href="/register" className={classes.commonerLink}>Register</a></Typography>
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

  export default withStyles(styles)(Login);