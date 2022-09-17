import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const Spinner = () => {
    return (
        <Box sx={{ display: 'flex',
            justifyContent:"center",
            position: "relative",
            zIndex: "100",
            top: "30vh"
        }}>
            <CircularProgress  size={"10em"} />
        </Box>
    );
};

export default Spinner;
