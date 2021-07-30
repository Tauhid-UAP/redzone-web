import React from 'react';

import { connect } from 'react-redux';

import {
    Button, Grid, Typography, FormControl, TextField, Checkbox, FormControlLabel, Select, MenuItem
} from "@material-ui/core";

import { Search } from "@material-ui/icons";

import {withRouter} from "react-router-dom";

class AddRoutine extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            covidPositive: false,
            visitedOutside: false,
            otherInteraction: false,
            woreMask: false,
            worePPE: false,
            locationInput: '',
            fetchedLocations: []
        };
        
        this.addRoutineButtonPressed = this.addRoutineButtonPressed.bind(this);
        this.covidPositiveToggle = this.covidPositiveToggle.bind(this);
        this.visitedOutsideToggle = this.visitedOutsideToggle.bind(this);
        this.otherInteractionToggle = this.otherInteractionToggle.bind(this);
        this.woreMaskToggle = this.woreMaskToggle.bind(this);
        this.worePPEToggle = this.worePPEToggle.bind(this);
        this.locationInputChange = this.locationInputChange.bind(this);
        this.handleFetchLocationsButtonPressed = this.handleFetchLocationsButtonPressed.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
    }

    render(){
        return (
            <Grid container spacing={5}>
                <Grid item xs={12} align="center">
                    <Typography component="h5" variant="h5">
                        Enter an activity of today.
                    </Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <FormControl component="fieldset">
                        <TextField 
                            required={true}
                            type="text"
                            label="Location"
                            value={this.state.locationInput}
                            error={this.state.locationInput === ''}
                            helperText={this.state.locationInput === '' ? 'Location is required' : ''}
                            onChange={this.locationInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4} align="left">
                    <FormControl component="fieldset">
                        <Button
                            style={{color: "white", backgroundColor: "green"}}
                            variant="contained"
                            onClick={this.handleFetchLocationsButtonPressed}
                            >
                            <Search />
                            Get matching locations
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={4} align="left">
                    <FormControl component="fieldset">
                        {this.state.fetchedLocations.length === 0 ? 
                            <Typography align="left">No matching locations.</Typography> :
                            (
                                <div>
                                    <Typography align="left">Select a location</Typography>
                                    <Select
                                        value={this.state.location}
                                        onChange={this.handleSelectLocation}
                                        >
                                        {this.state.fetchedLocations.map((fetchedLocation, index) => (
                                            <MenuItem key={index} value={fetchedLocation}>{fetchedLocation}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControlLabel
                        label="Were you tested positive for Covid-19 after this activity?"
                        control={<Checkbox
                            checked={this.state.covidPositive}
                            onChange={this.covidPositiveToggle} name="covidPositive"
                        />}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControlLabel
                        label="Is this location outside of your residence?"
                        control={<Checkbox
                            checked={this.state.visitedOutside}
                            onChange={this.visitedOutsideToggle} name="visitedOutside"
                        />}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControlLabel
                        label="Did you interact with other people during this activity?"
                        control={<Checkbox
                            checked={this.state.otherInteraction}
                            onChange={this.otherInteractionToggle} name="otherInteraction"
                        />}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControlLabel
                        label="Did you wear a mask during this activity?"
                        control={<Checkbox
                            checked={this.state.woreMask}
                            onChange={this.woreMaskToggle} name="woreMask"
                        />}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControlLabel
                        label="Did you wear PPE during this activity?"
                        control={<Checkbox
                            checked={this.state.worePPE}
                            onChange={this.worePPEToggle} name="worePPE"
                        />}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.addRoutineButtonPressed}
                        >
                        Add Routine
                    </Button>
                </Grid>
            </Grid>
        )
    }

    locationInputChange(e) {
        // while changing locationInput
        // fetchedLocations also need to be emptied
        // while user is typing
        this.setState({
            locationInput: e.target.value,
            fetchedLocations: []
        });
    }

    // e will be the onChange event object
    // stateKey will be the key
    // of the state object to change the value
    covidPositiveToggle(e) {
        this.setState({
            covidPositive: e.target.checked
        });
    }

    // e will be the onChange event object
    // stateKey will be the key
    // of the state object to change the value
    visitedOutsideToggle(e) {
        this.setState({
            visitedOutside: e.target.checked
        });
    }

    // e will be the onChange event object
    // stateKey will be the key
    // of the state object to change the value
    otherInteractionToggle(e) {
        this.setState({
            otherInteraction: e.target.checked
        });
    }

    // e will be the onChange event object
    // stateKey will be the key
    // of the state object to change the value
    woreMaskToggle(e) {
        this.setState({
            woreMask: e.target.checked
        });
    }

    // e will be the onChange event object
    // stateKey will be the key
    // of the state object to change the value
    worePPEToggle(e) {
        this.setState({
            worePPE: e.target.checked
        });
    }

    // handle when user has provided a location input
    // fetch some valid locations using Barikoi API
    handleFetchLocationsButtonPressed() {
        // return in case of empty string
        if(this.state.locationInput === ''){
            return;
        }

        // fetch matching locations using Barikoi API
        fetch(process.env.REACT_APP_BARIKOI_LOCATION_API + this.state.locationInput)
        .then(response => response.json())
        .then(response => {
            console.log('Success:', response);
            if(response.places){
                // response is an object like so {places: [{}, ..., {}], ...}
                // make an array using the address attributes
                // of each entry of the places attribute of the response object
                // to get all the address only
                const fetchedLocations = response.places.map(place => place.address);

                // assign the contructed array to fetchedLocations
                this.setState({
                    fetchedLocations
                });
                
                return;
            }

            // if no places were sent
            // empty fetchedLocations
            this.setState({
                fetchedLocations: []
            });
        })
        .catch(error => console.error('Error:', error));
    }

    handleSelectLocation(e) {
        // after selecting location
        // change state with its value
        this.setState({
            location: e.target.value,
        })
    }

    addRoutineButtonPressed() {
        console.log('Add routine button pressed!');
        const location = this.state.location;
        const covidPositive = this.state.covidPositive;
        const visitedOutside = this.state.visitedOutside;
        const otherInteraction = this.state.otherInteraction;
        const woreMask = this.state.woreMask;
        const worePPE = this.state.worePPE;
        
        if(!location || (covidPositive === null) || (visitedOutside === null) || (otherInteraction === null) || (woreMask === null) || (worePPE === null)){
            console.log('Returning.');
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + this.props.token,
            },
            body: JSON.stringify({
                location,
                covid_positive: covidPositive,
                visited_outside: visitedOutside,
                other_interaction: otherInteraction,
                wore_mask: woreMask,
                wore_ppe: worePPE
            }),
        };

        fetch(this.props.domain + "/post_routine/", requestOptions)
            .then(response => {
                if(response.status === 400){
                    // status code 400
                    // indicates invalid token
                    alert('Not logged in. Please log in to continue.');
                    return;
                }

                if(response.status === 422){
                    // status code 422
                    // indicates error in form data
                    alert('Error in routine form data');
                    console.log('Errors: ', response)
                    return;
                }

                response.json()
                    .then(data => {
                        this.props.history.push('/routines', {token: data.token});
                    });
            })
            .catch(error => alert('Could not contact the server!'));
        
        this.setState({
            location: '',
            covidPositive: false,
            visitedOutside: false,
            otherInteraction: false,
            woreMask: false,
            worePPE: false
        });
    }
}

// the component that it is connected to
// wil have token as a prop
const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps, null)(withRouter(AddRoutine));