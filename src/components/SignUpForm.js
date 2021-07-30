import React from 'react';

import { setToken } from '../actions/changeToken';
import { connect } from 'react-redux';

import {
    Button, Grid, Typography, FormControl, TextField, ClickAwayListener, MenuItem
} from "@material-ui/core";

import { withRouter } from "react-router-dom";

class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            gender: null,
            email: '',
            password: '',
            profession: '',
            dateOfBirth: '',
            disabled: true,
        };
        this.signupButtonPressed = this.signupButtonPressed.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.genderChange = this.genderChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.professionChange = this.professionChange.bind(this);
        this.dateOfBirthChange = this.dateOfBirthChange.bind(this);
        this.formClicked = this.formClicked.bind(this);
        this.formClickAway = this.formClickAway.bind(this);
    }

    render(){
        return (
            <ClickAwayListener onClickAway={this.formClickAway}>
                <Grid container spacing={5} onClick={this.formClicked}>
                    <Grid item xs={12} align="center">
                        <Typography component="h5" variant="h5">
                            Don't have an account? Create one.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField 
                                required={true}
                                type="text"
                                label="First Name"
                                error={this.state.disabled ? false : this.state.firstName === ''}
                                helperText={this.state.firstName === '' ? 'First Name is required' : ''}
                                onChange={this.firstNameChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField 
                                required={true}
                                type="text"
                                label="Last Name"
                                error={this.state.disabled ? false : this.state.lastName === ''}
                                helperText={this.state.lastName === '' ? 'Last Name is required' : ''}
                                onChange={this.lastNameChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField 
                                required={true}
                                type="text"
                                label="Username"
                                error={this.state.disabled ? false : this.state.username === ''}
                                helperText={this.state.username === '' ? 'Username is required' : ''}
                                onChange={this.usernameChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField
                                helperText="Gender"
                                select
                                onChange={this.genderChange}
                                onClick={this.formClicked}>
                                <MenuItem value={1}>Male</MenuItem>
                                <MenuItem value={2}>Female</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField
                                required={true}
                                type="email"
                                label="Email Address"
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
                                error={this.state.disabled ? false : this.state.password === ''}
                                helperText={this.state.password === '' ? 'Password is required' : ''}
                                onChange={this.passwordChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField
                                required={false}
                                type="text"
                                label="Profession"
                                helperText={'Optional'}
                                onChange={this.professionChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <TextField
                                required={false}
                                type="date"
                                onChange={this.dateOfBirthChange}
                                onClick={this.formClicked}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={this.state.disabled}
                            onClick={this.state.disabled ? this.formClicked : this.signupButtonPressed}>
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </ClickAwayListener>
        )
    }

    firstNameChange(e) {
        this.setState({
            firstName: e.target.value,
        });
    }

    lastNameChange(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    usernameChange(e) {
        this.setState({
            username: e.target.value,
        });
    }

    genderChange(e) {
        this.setState({
            gender: e.target.value,
        });
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

    professionChange(e) {
        this.setState({
            profession: e.target.value,
        });
    }

    dateOfBirthChange(e) {
        this.setState({
            dateOfBirth: e.target.value,
        });
    }

    signupButtonPressed() {
        console.log('Login button pressed!');
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const username = this.state.username;
        const gender = this.state.gender;
        const email = this.state.email;
        const password = this.state.password;
        const profession = this.state.profession;
        const dateOfBirth = this.state.dateOfBirth;
        
        if(!firstName || !lastName || !username || !email || !password){
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'firstName': firstName,
                'lastName': lastName,
                'username': username,
                'gender': gender,
                'email': email,
                'password': password,
                'profession': profession,
                'dateOfBirth': dateOfBirth,
            }),
        };

        fetch(this.props.domain + "/create_user/", requestOptions)
            .then((response) => {
                if(response.status !== 200){
                    console.log('Errors: ', response);
                    return;
                }

                // login after successfully signing up
                console.log('Data: ', response.body);
                const loginRequestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        'username': email,
                        'password': password
                    }),
                };
                
                fetch(this.props.domain + "/get_auth_token/", loginRequestOptions)
                    .then(response => {
                        if(response.status !== 200){
                            alert('Invalid username or password!');
                            return;
                        }
        
                        response.json()
                            .then(data => {
                                console.log('token: ', data.token);
                                alert('Sign up successful. Logging In.');
                                this.props.setToken(data.token);
                                this.props.history.push('/profile', {token: data.token});
                            });
        
                        this.setState({
                            firstName: '',
                            lastName: '',
                            username: '',
                            gender: null,
                            email: '',
                            password: '',
                            profession: '',
                            dateOfBirth: '',
                            disabled: true
                        });
                        
                    })
                    .catch(error => alert('Could not contact the server!'));
            });
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

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(SignUpForm));