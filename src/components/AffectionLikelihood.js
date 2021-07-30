import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Card, CardContent, Typography } from "@material-ui/core";

class AffectionLikelihood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            probabilityUnsafe: null
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + this.props.token,
            },
        };

        fetch(this.props.domain + '/get_prediction/', requestOptions)
            .then(response => {
                if(response.status === 400){
                    console.log('No routines found!');
                    return;
                }
                
                response.json()
                    .then(data => {
                        const probabilityUnsafe = data['affection_probability'];
                        console.log('probabilityUnsafe: ', probabilityUnsafe);

                        this.setState({
                            probabilityUnsafe
                        });
                    })
                    .catch(error => console.log('Error: ', error));
            })
            .catch(error => console.log('Error: ', error));
    }

    render() {
        return (
            <div>
                {this.state.probabilityUnsafe != null ?
                    <Card>
                        <CardContent>
                            <Typography align="center">
                                {/* round probabilityUnsafe to 2 decimal places */}
                                {"" + Math.round(this.state.probabilityUnsafe * 100) / 100 +  "% based on your last 14 routines."}
                            </Typography>
                        </CardContent>
                    </Card>:
                    <Typography align="center">No routines found. Please enter a routine.</Typography>}
            </div>
        )
    }
}

// the component that it is connected to
// will have token as a prop
const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps, null)(withRouter(AffectionLikelihood));