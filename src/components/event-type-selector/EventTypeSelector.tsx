import React from 'react';
import {FormControl, FormHelperText, Grid, MenuItem, Select, TextField} from "@mui/material";

const EventTypeSelector = () => {
    return (
        <Grid xs={12}>
            <Grid item xs={12}>
                <FormControl fullWidth sx={{minWidth: 120}}>
                    <Select
                        // value={age}
                        // onChange={handleChange}
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"wedding"}>Wedding</MenuItem>
                        <MenuItem value={"conference"}>Conference</MenuItem>
                        <MenuItem value={"privateEvent"}>Private Event</MenuItem>
                    </Select>
                    <FormHelperText>* Event type</FormHelperText>
                </FormControl>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{minWidth: 120}}>
                        <TextField
                            variant="standard"
                            required
                            // value={email}
                            fullWidth
                            disabled={true}
                            id="owner_name1"
                            placeholder={`Bride`}
                            type="text"
                            name="owner_name1"
                            onChange={(event) => {
                                // setEmail(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{minWidth: 120}}>
                        <TextField
                            variant="standard"
                            required
                            // value={email}
                            fullWidth
                            id="owner_name2"
                            disabled={true}
                            placeholder={`Groom`}
                            type="text"
                            name="owner_name1"
                            onChange={(event) => {
                                // setEmail(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>

        </Grid>
    );
};

export default EventTypeSelector;
