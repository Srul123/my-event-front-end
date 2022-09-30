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
import {StateSelectors} from "../redux-modules/selectores/stateSelectores";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import {devicesModes, Local} from "../interfaces/Locales";
import EventDetails from "./event-details";
import Spinner from "../components/layouts/spinner/Spinner";


interface RouteViews {
    home: string,
    registration: string,
    login: string,
    myProfile: string
    eventDetails: string,
    invitedManagement: string
}

export const routes: RouteViews = {
    home: "/",
    registration: "/registration",
    login: "/login",
    myProfile: "/my-profile",
    eventDetails: "/event-details",
    invitedManagement: "/invited-management"
};


export const optionRoutes = [
    {
        title: 'header.menu.overall_status',
        icon: <PlaylistAddCheckIcon className={"my-icons"}/>,
        route: routes.myProfile,
    },
    {
        title: 'header.menu.event_details',
        icon: <EventNoteIcon className={"my-icons"}/>,
        route: routes.eventDetails,
    },
    {
        title: 'header.menu.invited_management',
        icon: <PeopleOutlineIcon className={"my-icons"}/>,
        route: routes.invitedManagement,
    },
    {
        title: 'header.menu.rsvp',
        icon: <MarkunreadMailboxIcon className={"my-icons"}/>,
        route: "/rsvp",
    },
    {
        title: 'header.menu.seating_arrangement',
        icon: <BorderVerticalIcon className={"my-icons"}/>,
        route: "/seating-arrangement",
    },
    {
        title: 'header.menu.expenses_summary',
        icon: <AttachMoneyIcon className={"my-icons"}/>,
        route: "/expenses-summary",
    },
    {
        title: 'header.menu.account_settings',
        icon: <SettingsIcon className={"my-icons"}/>,
        route: "/account-settings",
    }
];

const AppViews: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const application = useSelector(StateSelectors.application);

    React.useEffect(() => {
        if (!application.auth.isLoggedIn &&
            location.pathname === routes.myProfile
        ) {
            navigate(routes.login, {replace: true});
        }
    }, []);

    let offsetScreenSideStyle = {paddingTop: "", paddingRight: "", paddingLeft: ""};
    if (application.local.device !== devicesModes.mobile) {
        if (application.local.side === "right") {
            offsetScreenSideStyle = {
                ...offsetScreenSideStyle,
                paddingTop: "5em",
                paddingLeft: "",
                paddingRight: "5em"
            }
        } else {
            offsetScreenSideStyle = {
                ...offsetScreenSideStyle,
                paddingTop: "5em",
                paddingLeft: "5em",
                paddingRight: ""
            }
        }
    }

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Container maxWidth="md"
                       style={{display: "flex", flexDirection: "column", ...offsetScreenSideStyle}}>
                {application.isAppLoading &&
                <Spinner/>
                }
                <Routes>
                    <Route path={routes.home} element={<Home/>}/>
                    <Route path={routes.registration} element={<Registration/>}/>
                    <Route path={routes.login} element={<Login/>}/>
                    {
                        application.auth.isLoggedIn &&
                        <>
                            <Route path={routes.myProfile} element={<MyProfile/>}/>
                            <Route path={routes.eventDetails} element={<EventDetails/>}/>
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

