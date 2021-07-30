import React from 'react';

import { setToken } from '../actions/changeToken';
import { connect } from 'react-redux';

import {
    Button, Grid, Typography, FormControl, TextField, ClickAwayListener
} from "@material-ui/core";

import {withRouter} from "react-router-dom";

class SignInForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            disabled: false,
        };

        console.log('SignInForm_token: ', this.props.token);
        
        this.loginButtonPressed = this.loginButtonPressed.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.formClicked = this.formClicked.bind(this);
        this.formClickAway = this.formClickAway.bind(this);
    }

    render(){
        return (
            <ClickAwayListener onClickAway={this.formClickAway}>
                <Grid container spacing={5} onClick={this.formClicked}>
                    <Grid item xs={12} align="center">
                        <Typography component="h5" variant="h5">
                            Already have an account? Sign in.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField
                                required={true}
                                type="email"
                                label="Email Address"
                                value={this.state.email}
                                error={this.state.disabled ? false : this.state.email === ''}
                                helperText={this.state.email === '' ? 'Email address is required' : ''}
                                onChange={this.emailChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField
                                required={true}
                                type="password"
                                label="Password"
                                value={this.state.password}
                                error={this.state.disabled ? false : this.state.password === ''}
                                helperText={this.state.password === '' ? 'Password is required' : ''}
                                onChange={this.passwordChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={this.state.disabled}
                            onClick={this.state.disabled ? this.formClicked : this.loginButtonPressed}
                            >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </ClickAwayListener>
        )
    }

    emailChange(e) {
        this.setState({
            email: e.target.value,
        });
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    loginButtonPressed() {
        console.log('Login button pressed!');
        const email = this.state.email, password = this.state.password;
        
        if(!email || !password){
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'username': email,
                'password': password
            }),
        };

        fetch(this.props.domain + "/get_auth_token/", requestOptions)
            .then(response => {
                if(response.status !== 200){
                    alert('Invalid username or password!');
                    return;
                }

                response.json()
                    .then(data => {
                        console.log('token: ', data.token);
                        alert('Logging In.');
                        this.props.setToken(data.token);
                        this.props.history.push('/profile', {token: data.token});
                    });

                this.setState({
                    email: '',
                    password: '',
                    disabled: true
                });
                
            })
            .catch(error => alert('Could not contact the server!'));
    }

    formClicked() {
        this.setState({
            disabled: false,
        });
    }

    formClickAway() {
        this.setState({
            disabled: true,
        });
    }
}

// the component that it is connected to
// wil have token as a prop
const mapStateToProps = state => ({
    token: state.token
});

// the component that it is connected to
// will have setNewToken and clearToken as props
// object structure {a, b} equivalent to {a: a, b: b}
const mapDispatchToProps = () => ({
    setToken
});

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(SignInForm));