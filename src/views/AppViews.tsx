import React, {useEffect} from "react";
import {Route, useLocation, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";
import Home from "./index";
import NotFound_404 from "./404";
import Registration from "./registration";
import {CssBaseline} from "@mui/material";
import Login from "./login";
import MyProfile from "./my-profile";
import {UserState} from "../redux-modules/selectores/stateSelectores";

interface RouteViews {
    home: string,
    registration: string,
    login: string,
    myProfile: string
}

export const routes: RouteViews = {
    home: "/",
    registration: "/registration",
    login: "/login",
    myProfile: "/my-profile"
};


const AppViews: React.FC = () => {
    const location = useLocation();
    let navigate = useNavigate();

    const isLoggedIn = useSelector(UserState.getAuthUser);

    React.useEffect(() => {
        if (!isLoggedIn &&
            location.pathname === routes.myProfile
            // location.pathname==='/event-details' ||
        ) {
            navigate(routes.login, {replace: true});
        }
    }, []);
    console.log('isLoggedIn');
    console.log(isLoggedIn);
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Container maxWidth="md" style={{display:"flex", minHeight:"90vh", flexDirection:"column"}}>
                <Routes>
                    <Route path={routes.home} element={<Home/>}/>
                    <Route path={routes.registration} element={<Registration/>}/>
                    <Route path={routes.login} element={<Login/>}/>
                    {
                        isLoggedIn &&
                        <>
                            <Route path={routes.myProfile} element={<MyProfile/>}/>
                        </>
                    }
                    <Route path='*' element={<NotFound_404/>}/>
                </Routes>
            </Container>
            <Footer/>
        </>
    );
};
export default AppViews

