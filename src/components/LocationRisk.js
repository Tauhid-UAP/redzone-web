import React from 'react';

import {
    Button, Grid, Typography, FormControl, TextField, Card, CardContent, Select, MenuItem
} from "@material-ui/core";

import { Search } from '@material-ui/icons';

import { connect } from 'react-redux';

import { withRouter } from "react-router-dom";

class LocationRisk extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            locationRisk: null,
            numRecords: null,
            color: null,
            locationInput: '',
            fetchedLocations: []
        };
        // location: the actual location to be sent to the server
        // locationRisk: the percentage risk associated with location
        // numRecords: the number of records used for the prediction
        // color: green (low risk), blue (medium risk), red (high risk)
        // locationInput: the input string to search for legitimate locations using Barikoi API
        // fetchedLocations: locations returned by Barikoi API
        
        this.locationRiskButtonPressed = this.locationRiskButtonPressed.bind(this);
        this.locationInputChange = this.locationInputChange.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleFetchLocationsButtonPressed = this.handleFetchLocationsButtonPressed.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
    }

    render(){
        return (
            <Grid container spacing={5} onClick={this.formClicked}>
                <Grid item xs={12} align="center">
                    <Typography component="h5" variant="h5">
                        Enter location to get risk assessment.
                    </Typography>
                </Grid>
                <Grid item xs={4} align="right">
                    <FormControl component="fieldset">
                        <TextField 
                            required={true}
                            type="text"
                            label="Location"
                            error={this.state.location === ''}
                            helperText={this.state.location === '' ? 'Location is required' : ''}
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
                {this.state.location === '' ?
                    null :
                    <Grid container spacing={5}>
                        <Grid item xs={5} align="right">
                            <Typography>Location: <b>{this.state.location}</b>.</Typography>
                        </Grid>
                
                        <Grid item xs={5} align={this.state.location === '' ? "right" : "left"}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.locationRiskButtonPressed}>
                                Get Location Risk
                            </Button>
                        </Grid>
                    </Grid>
                }
                {this.state.locationRisk != null ? 
                    <Grid item xs={12} align="center">
                        <Card>
                            <CardContent>
                                <Typography align="center">{this.state.location}</Typography>
                                <Typography style={{color: this.state.color}} align="center">
                                    {/* round locationRisk to 2 decimal places */}
                                    {this.state.numRecords ?
                                        "" + Math.round(this.state.locationRisk * 100) / 100 + " % risk of affection" :
                                        null}
                                </Typography>
                                <Typography align="center">
                                    {this.state.numRecords ?
                                        "Obtained from " + this.state.numRecords + " record(s)." :
                                        "No record exists for this location"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid> :
                    null}
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

    // the button associated with this click handler
    // will only be rendered if there is a valid location
    locationRiskButtonPressed() {
        console.log('Location risk button pressed!');
        const location = this.state.location;

        // Accepted answer from
        // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
        const url = new URL(this.props.domain + '/location_risk/');
        const queryParams = {
            location
        };
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

        fetch(url)
            .then((response) => {
                if(response.status === 400){
                    alert('Location was not provided!');
                    return;
                }

                if(response.status === 200){
                    response.json()
                    .then(data => {
                        const locationRisk = data['affected_rate'];
                        const numRecords = data['num_records'];
                        
                        let color = 'green';
                        if((locationRisk > 39) && (locationRisk <= 55)){
                            color = 'blue';
                        }else if(locationRisk > 55){
                            color = 'red';
                        }

                        this.setState({
                            locationRisk,
                            numRecords,
                            color
                        });
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    });
                }
            })
            .catch((error) => console.log('Error: ', error));
    }

    // handle when user has provided a location input
    // fetch some valid locations using Barikoi API
    handleFetchLocationsButtonPressed() {
        // return in case of empty string
        if(this.state.locationInput === ''){
            return;
        }

        // fetch matching locations using Barikoi API
        fetch("https://barikoi.xyz/v1/api/search/verify/autocomplete/" + process.env.REACT_APP_BARIKOI_LOCATION_API + this.state.locationInput)
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
        // nullify locationRisk and numRecords
        // to erase prior location risk prediction
        this.setState({
            location: e.target.value,
            locationRisk: null,
            numRecords: null
        })
    }

    handleMenuClose() {
        this.setState({
            anchorEl: null
        });
    };
}

// the component that it is connected to
// wil have token as a prop
const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps, null)(withRouter(LocationRisk));