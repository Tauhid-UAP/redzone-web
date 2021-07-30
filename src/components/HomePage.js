import React, { Component } from "react";

import ProfileInfo from "./ProfileInfo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import UserRoutines from "./UserRoutines";
import LocationRisk from "./LocationRisk";
import AffectionLikelihood from "./AffectionLikelihood";
import AddRoutine from "./AddRoutine";
import About from "./About"

import {
    Grid, Typography, AppBar, Toolbar, Button, IconButton, Menu, MenuItem
} from "@material-ui/core";

import { Menu as MenuIcon, AccountCircle, ExitToApp } from "@material-ui/icons";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

import { connect } from 'react-redux';
import { clearToken, setToken } from "../actions/changeToken";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };

        this.logoutButtonPressed = this.logoutButtonPressed.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);

        this.domain = 'https://iamtauhid.pythonanywhere.com';
        // this.domain = 'http://127.0.0.1:8000';

        console.log('Homepage_token: ', this.props.token);
    }

    render() {
        console.log('anchorEl: ', this.state.anchorEl);

        const profileMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}
            >
                <MenuItem component={Link} to='/profile' onClick={this.handleMenuClose}>
                    <AccountCircle /> Profile
                </MenuItem>
                <MenuItem component={Link} to='/routines' onClick={this.handleMenuClose}>Routines</MenuItem>
                <MenuItem component={Link} to='/location_risk' onClick={this.handleMenuClose}>Location Risk</MenuItem>
                <MenuItem component={Link} to='/affection_likelihood' onClick={this.handleMenuClose}>Affection Likelihood</MenuItem>
                <MenuItem component={Link} to='/add_routine' onClick={this.handleMenuClose}>Add Routine</MenuItem>
                <MenuItem onClick={this.logoutButtonPressed}>
                    <Button color="secondary">
                        <ExitToApp /> Logout
                    </Button>
                </MenuItem>
            </Menu>
        )
        

        console.log('profileMenu: ', profileMenu);
        
        return (
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            align="center">
                            <Link
                                style={{textDecoration: 'none', color: 'white'}}
                                to='/'>
                                RedZone
                            </Link>
                        </Typography>
                        {this.props.token ?
                            <IconButton
                                color="inherit"
                                style={{paddingLeft: "85%"}}
                                onClick={this.handleMenuOpen}
                                >
                                <MenuIcon />
                            </IconButton> :
                            null}
                        <Typography
                            style={this.props.token ? null: {paddingLeft: "85%"}} 
                            variant="h6" 
                            align="center">
                            <Link 
                                style={{textDecoration: 'none', color: 'white'}}
                                to='/about'>
                                About
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Typography
                    style={{color: "green"}}
                    variant="h6"
                    gutterBottom
                    align="center">
                    This website is not fully adjusted for mobile devices yet.
                </Typography>
                { profileMenu }
                <Switch>
                    <Route exact path='/'>
                        {this.props.token ?
                            <Redirect to='/profile'/> :
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <SignInForm domain={this.domain} />
                                </Grid>
                                <Grid item xs={6}>
                                    <SignUpForm domain={this.domain} />
                                </Grid>
                            </Grid>}
                    </Route>
                    <Route path='/profile'>
                        {this.props.token ?
                            <Grid container spacing={0}>
                                <Grid item xs={4}>
                                </Grid>
                                <Grid item xs={4}>
                                    <ProfileInfo domain={this.domain} />
                                </Grid>
                                <Grid item xs={4}>
                                </Grid>
                            </Grid> :
                            <Redirect to="/" />}
                    </Route>
                    <Route path='/routines'>
                        {this.props.token ?
                            <UserRoutines domain={this.domain} /> :
                            <Redirect to="/" />}
                    </Route>
                    <Route path='/location_risk'>
                        {this.props.token ?
                            <LocationRisk domain={this.domain} /> :
                            <Redirect to="/" />}
                    </Route>
                    <Route path='/affection_likelihood'>
                        {this.props.token ?
                            <AffectionLikelihood domain={this.domain} /> :
                            <Redirect to="/" />}
                    </Route>
                    <Route path='/add_routine'>
                        {this.props.token ?
                            <AddRoutine domain={this.domain} /> :
                            <Redirect to="/" />}
                    </Route>
                    <Route path='/about'>
                            <About domain={this.domain} />
                    </Route>
                </Switch>
            </Router>
        );

    }

    logoutButtonPressed() {
        this.handleMenuClose();
        this.props.clearToken();
    }

    handleMenuOpen(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    
    handleMenuClose() {
        this.setState({
            anchorEl: null
        });
    };
}

// the component that it is connected to
// will have token as a prop
const mapStateToProps = state => ({
    token: state.token
});

// the component that it is connected to
// will have setNewToken and clearToken as props
// object structure {a, b} equivalent to {a: a, b: b}
const mapDispatchToProps = () => ({
    setToken,
    clearToken
});

export default connect(mapStateToProps, mapDispatchToProps())(HomePage);