import React from "react";
import {Route, useLocation, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";


const CustomApp: React.FC = () => {
    // const location  = useLocation();
    // let navigate = useNavigate();
    // const isLoggedIn = useSelector((state) => {
    //     return state.userReducer.login;
    // });

    const isLoggedIn: boolean = true;

    // React.useEffect(()=>{
    //     if (!isLoggedIn &&
    //         location.pathname==='/myprofile' ||
    //         location.pathname==='/event-details' ||
    //         location.pathname==='/invite-management' ||
    //         location.pathname==='/seating-arrangement'
    //     ) {
    //         navigate("/signin", { replace: true });
    //     }
    // }, []);


    return (
        <div style={{position: "relative", minHeight: "100vh"}}>
            <Header/>
            <Container fixed style={{paddingLeft: "5%"}}>
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
            </Container>
            <Footer/>
        </div>
    );
};
export default CustomApp
