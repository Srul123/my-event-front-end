import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";

const EventDetails = () => {
    return (
        <div>
            <Box sx={{flexGrow: 1}} style={{marginTop: "2em"}}>
                <Grid container spacing={{xs: 2, sm: 2, md: 2}} >
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper>
                            <Typography variant="h4">inbal name</Typography>
                            <Typography variant="h6">location: location name</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper>
                            <Typography variant="h6">Event
                                date: 15.09</Typography>
                            <Typography variant="h6">Event
                                Time: 24:00</Typography>
                            <Typography variant="h6">{"Event start in: "}
                                {/*<Countdown date={eventDate.getTime()}/>*/}
                                {" days"}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{flexGrow: 1}} style={{marginTop: "2em"}}>
                <Grid container spacing={{xs: 2, sm: 2, md: 2}} >
                    <Grid item xs={6} sm={6} md={3}>
                        <Paper>
                            <Typography variant="h4">inbal name</Typography>
                            <Typography variant="h6">location: location name</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Paper>
                            <Typography variant="h4">inbal name</Typography>
                            <Typography variant="h6">location: location name</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Paper>
                            <Typography variant="h4">inbal name</Typography>
                            <Typography variant="h6">location: location name</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Paper>
                            <Typography variant="h4">inbal name</Typography>
                            <Typography variant="h6">location: location name</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default EventDetails;
