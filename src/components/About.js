import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid } from "@material-ui/core";
import imgKamruzzamanTauhid from "../images/kamruzzaman-tauhid.jpg";
import imgKowshiqueRoy from "../images/kowshique-roy.jpg";
import imgSakibShahriar from "../images/sakib-shahriar.jpg";

import { Menu as MenuIcon, AccountCircle, ExitToApp } from "@material-ui/icons";


class About extends Component {
    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom align="center">What is RedZone?</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Typography variant="subtitle1" gutterBottom>
                        We envision RedZone to be a platform where users can contribute to raising awareness about Covid-prone activites and benefit from the collective knowledge of the community.
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom align="center">How it works</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Typography variant="subtitle1" gutterBottom>
                        Users submit their activity information, called routines, and it gets stored in the server. Any user can request to get a prediction of their risk of getting affected by Covid-19 and they will get a prediction based on their last 14 routines contrasted against the routines of all other users.
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom align="center">How to use?</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Typography variant="subtitle1" gutterBottom>
                        Sign up if you don't have an account. Then sign in and you will be redirected to the profile page.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        In the top right corner, there will be a <MenuIcon /> icon right before "About" which will reveal some options after clicking.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        The "Profile" option with the <AccountCircle /> icon redirects back to the profile.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        The "Routines" option shows the user all the routines that they have submitted.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        The "Location Risk" option leads to a page where the users will be asked for a location and the percentage risk for that location will be displayed if any record of that location exists in the records.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        "Affection Likelihood" takes into account the last 14 activity records of the user and makes a prediction by contrasting it with the records of all other users.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Add a routine by going to "Add Routine".
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        "LOGOUT" with the <ExitToApp color="secondary" /> icon logs you out.
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom align="center">Disclaimer</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Typography variant="subtitle1" gutterBottom>
                        We intend all activity information to be submitted by users and it is with this information that our system makes predictions. As such, we do not claim authenticity of any record that we store, nor do we claim to offer reliable predictions. We do not intend to cause panic or delusion through any statements made on this platform. We are strong advocates of adherence to the safety protocols advised by medical professionals and credible health research organizations.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        RedZone should not be a substitute for any credible organization such as WHO. Our platform simply serves to offer estimates based on data submitted by the public.
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom align="center">Brought to you by</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardMedia image={imgKowshiqueRoy} style={{height: 250, width: 250, margin: "auto", align: "center"}} />
                        <CardContent>
                            <Typography variant="h5" align="center">Kowshique Roy</Typography>
                            <Typography variant="body1" align="center">Developer - Android App</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                <Card>
                        <CardMedia image={imgKamruzzamanTauhid} style={{height: 250, width: 250, margin: "auto", align: "center"}} />
                        <CardContent>
                            <Typography variant="h5" align="center">Kamruzzaman Tauhid</Typography>
                            <Typography variant="body1" align="center">Developer - REST API and web frontend</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                <Card>
                        <CardMedia image={imgSakibShahriar} style={{height: 250, width: 250, margin: "auto", align: "center"}} />
                        <CardContent>
                            <Typography variant="h5" align="center">Sakib Shahriar</Typography>
                            <Typography variant="body1" align="center">Project Analyst</Typography>
                        </CardContent>
                    </Card>
                </Grid>
        </Grid>
        )
    }
}

export default withRouter(About);