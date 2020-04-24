import React, { Component } from 'react';
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
import FourOhFour from "./components/Pages/FourOhFour";
import Game from './components/Pages/Game/Game';

import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen : false});
  };


  render() {
    let backdrop;

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop click = {this.backdropClickHandler} />;
    }

    return (
      <Router>
        <div className="App">
          <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}
                  testtText = {this.state.testText} />
          <SideDrawer show={this.state.sideDrawerOpen}
                      closeSideDrawerFunction={this.backdropClickHandler}/>
          {backdrop}
            <div className="content">
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/game/:id" exact component={Game}/>
          <Route component={FourOhFour} />
        </Switch>
      </div>
    

            </div>
          </div>
          </Router>
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
