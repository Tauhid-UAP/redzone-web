import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Card, CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + this.props.token,
            },
        };

        fetch(this.props.domain + '/user_detail/', requestOptions)
            .then(response => {
                if(!response.ok){
                    console.log(response);
                    return;
                }
                
                console.log('response: ', response);
                
                response.json()
                    .then(data => {
                        const firstName = data['first_name'];
                        const lastName = data['last_name'];
                        const gender = data['gender'];
                        const username = data['username'];
                        const dateOfBirth = data['date_of_birth'];
                        const profession = data['profession'];

                        this.setState({
                            firstName: firstName,
                            lastName: lastName,
                            gender: gender === 1 ? 'Male' : 'Female',
                            username: username,
                            dateOfBirth: dateOfBirth,
                            profession: profession
                        });
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    });
            });
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography align="center">{this.state.firstName} {this.state.lastName}</Typography>
                    <Typography align="center">{this.state.gender}</Typography>
                    <Typography align="center">{this.state.username}</Typography>
                    <Typography align="center">{this.state.dateOfBirth}</Typography>
                    <Typography align="center">{this.state.profession}</Typography>
                </CardContent>

                <CardActions>
                    <IconButton style={{marginLeft: "40%"}}><Edit /></IconButton>
                </CardActions>
            </Card>
        )
    }
}

// the component that it is connected to
// will have token as a prop
const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps, null)(withRouter(ProfileInfo));