import React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from "react-router-dom";
import AlertIndicator, {AlertPopup} from "../components/alerts/AlertIndicator";
import Spinner from "../components/spinner/Spinner";


export default function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });

    // const setLoginUser = (user) =>
    //     dispatch(allActions.userActions.loginUser(user));
    // const getInvitersList = () =>
    //     dispatch(allActions.invitersActions.getInvitersList());
    // const getGroupList = () =>
    //     dispatch(allActions.groupsActions.getGroupList());
    // const getTableList = () =>
    //     dispatch(allActions.tableActions.getTablesList());

    const riseExceptionAlert = (message: string) => {
        setAlertPopup({
            open: true, ...{
                vertical: "top",
                horizontal: "center",
                severityInfo: "error",
                messageInfo: message ? message : "Please insert valid email and password"
            }
        });
    };

    const closeAlert = () => {
        setAlertPopup({...alertPopup, open: false});
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);
        // const errorMessage = validateInputsSignIn(email, password);
        const errorMessage = '';
        if (errorMessage !== '') {
            riseExceptionAlert(errorMessage);
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/users/`);
            const data = response.data;
            // let isAuthenticated = isAuthenticatedUser(email, password, data);
            let isAuthenticated = false;
            if (!isAuthenticated) {
                const errorMessage = "Your details are wrong, please provide an authorized email and password!";
                riseExceptionAlert(errorMessage);
                setLoading(false);
            } else if (isAuthenticated) {
                // setLoginUser(isAuthenticated);
                // getInvitersList();
                // getGroupList();
                // getTableList();
                setLoading(false);
                navigate("/myprofile", {replace: true});
            }
        } catch (error) {
            console.log("Error in SignIn component");
            console.log(error);
        }
    };

    if (loading) {
        return <Spinner/>;
    }

    return (
        <Container  maxWidth={"sm"}>
            <div style={{position: "relative", top: "10vh"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Avatar>
                        <LockIcon/>
                    </Avatar>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginBottom: "1vh"}}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                </div>

                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid style={{marginTop:"2vh"}}>
                        <Grid item xs>
                            <NavLink to="/">Forgot password?</NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to="/signup">{"Don't have an account? Sign Up"}</NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <AlertIndicator
                alertPopup={alertPopup}
                closeAlert={closeAlert}
            />
        </Container>
    );
}
