import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
import sideDrawer from './components/SideDrawer/SideDrawer';
import Side from './components/Side/Side';
import Main from './components/Pages/Main/Main';
import Login from "./components/Pages/Login";
import Logout from "./components/Pages/Logout";
import Register from "./components/Pages/Register";
import NewGame from "./components/Pages/NewGame";
import FourOhFour from "./components/Pages/FourOhFour";
import Game from './components/Pages/Game/Game';
import WaitRedirect from './components/addons/WaitRedirect';
import Axios from 'axios';
import {notif} from './lib/utils';

import './App.css';
import './lib/globals.js';

class App extends Component {
  constructor(){
    super();
    
    this.state = {
      sideDrawerOpen: false,
      isLoggedIn: JSON.parse(localStorage.getItem('loggedIn')),
      redirect: ''
    };
  }

  endGame = async (game) => {

    let deleteAfterAll = async () => {
      await Axios.delete(global.api + 'games/' + game.id)
      .then(data => {
        notif({msg: "Game was deleted. I hope you're happy"});
      })
      .catch(error => {
          console.log(error);
          console.log('it got here fortunately too too too or nu nu nu :o');
      });
    }

    notif({msg: "notif", timeout:0, buttons: true, yesAction: deleteAfterAll}); 
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen : false});
  };

  toggleLoginState = () => {    
    let isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    this.setState({isLoggedIn: isLoggedIn});
  }

  render() {
    let redirect = null;
    if(this.state.redirect != '')
      redirect = <WaitRedirect link={'/'} ms={0} />

    let backdrop;

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop click = {this.backdropClickHandler} />;
    }

    let testText = this.state.testText;
    let sideDrawerOpen = this.state.sideDrawerOpen;

    return (
      <Fragment>
        <Router>
          {redirect}
          <div className="App">
            <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}
                    
                    testtText = {testText}/>
            <SideDrawer show={sideDrawerOpen}
                        closeSideDrawerFunction={this.backdropClickHandler}/>
            {backdrop}
              <div className="content">
                <div>
                  <Switch>
                  <Route path="/login" render={() => <Login toggleLoginState={this.toggleLoginState} />}/>
                    <Route path="/logout" render={() => <Logout toggleLoginState={this.toggleLoginState} />}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/game/:id"  render={(props) => 
                        <Game {...props} leaveGame={this.leaveGame} endGame={this.endGame}/> }/>
                    <Route exact path="/" render={() => <Main leaveGame={this.leaveGame}/>}/>
                    <Route path="/newgame" exact component={NewGame}/>
                    <Route component={FourOhFour} />
                  </Switch>
                </div>
              </div>
            </div>
            </Router>
      </Fragment>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
