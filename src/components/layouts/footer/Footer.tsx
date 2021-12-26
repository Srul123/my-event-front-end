import React from 'react';
import Typography from "@mui/material/Typography";
// import {Link} from "react-router-dom";


const footerStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    padding: "1vh",
    backgroundColor: "rgb(63,81,181)",
    color: "white"
}

const Footer: React.FC = () => {
    return (
        <footer style={footerStyle}>
            <Typography variant="body2" align="center">
                {'Copyright © '}
                {/*<Link color="inherit" to="/" style={{color:"white"}}>*/}
                {/*    My-Event*/}
                {/*</Link>{' '}*/}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    );
}

export default Footer;

