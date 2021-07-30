import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Typography} from "@material-ui/core";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

class UserRoutines extends Component {
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

        fetch(this.props.domain + '/my_routines/', requestOptions)
            .then(response => {
                if(!response.ok){
                    console.log(response);
                    return;
                }
                
                console.log('response: ', response);
                
                response.json()
                    .then(data => {
                        this.setState({
                            routines: data
                        });
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    });
            });
    }

    render() {
        return (
            <div>
                {((this.state.routines) && (this.state.routines.length > 0)) ?
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Location</TableCell>
                                    <TableCell align="right">Visited Outside</TableCell>
                                    <TableCell align="right">Wore Mask</TableCell>
                                    <TableCell align="right">Wore PPE</TableCell>
                                    <TableCell align="right">Others Interaction</TableCell>
                                    <TableCell align="right">Covid Positive</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.routines.map((routine, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {routine.location}
                                        </TableCell>
                                        <TableCell align="right">{routine.visited_outside ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="right">{routine.wore_mask ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="right">{routine.wore_ppe ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="right">{routine.other_interaction ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="right">{routine.covid_positive ?
                                            <Typography color="secondary">Yes</Typography> :
                                            <Typography color="primary">No</Typography>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <Typography align="center">No routines found. Please enter a routine.</Typography>}
            </div>
        );
    }
}

// the component that it is connected to
// will have token as a prop
const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps, null)(withRouter(UserRoutines));