import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const Spinner = () => {
    return (
        <Box sx={{
            position:"fixed",
            zIndex: "1",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
        }}>
            <CircularProgress  size={"10em"} />
        </Box>
    );
};

export default Spinner;
