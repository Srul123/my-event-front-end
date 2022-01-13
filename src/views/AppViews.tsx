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

interface RouteViews {
    home: string,
    registration: string,
    login: string,
}

export const routes: RouteViews = {
    home: "/",
    registration: "registration",
    login: "login",
};


const AppViews: React.FC = () => {
    const location = useLocation();
    let navigate = useNavigate();

    const isLoggedIn: boolean = true;

    return (
        <div style={{position: "relative"}}>
            <CssBaseline/>
            <Header/>
            <Container fixed>
                {/*<Routes>*/}
                {/*<Route path={"/signup"} element={<SignUp/>}/>*/}
                {/*<Route path={"/signin"} element={<SignIn/>}/>*/}
                {/*<Route path={"/"} element={<div>index</div>}/>*/}
                {/*{*/}
                {/*    isLoggedIn &&*/}
                {/*    <>*/}
                {/*<Route path={"/myprofile"} exact element={<MyProfile />}/>*/}
                {/*<Route path={"/event-details"} exact element={<MyEventDetails />}/>*/}
                {/*<Route path={"/invite-management"} exact element={<InviteManagement />}/>*/}
                {/*<Route path={"/seating-arrangement"} exact element={<MySeatingArrangement />}/>*/}
                {/*</>*/}
                {/*}*/}
                {/*</Routes>*/}
                <Routes>
                    <Route path='*' element={<NotFound_404/>}/>
                    <Route path={routes.home} element={<Home/>}/>
                    <Route path={routes.registration} element={<Registration/>}/>
                </Routes>
            </Container>
            <Footer/>
        </div>
    );
};
export default AppViews
