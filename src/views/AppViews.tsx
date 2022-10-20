import React from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";
import Home from "./index";
import NotFound_404 from "./404";
import Registration from "./registration";
import { CssBaseline } from "@mui/material";
import Login from "./login";
import MyProfile from "./my-profile";
import { StateSelectors } from "../redux-modules/selectores/stateSelectores";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import EventDetails from "./event-details/event-details";
import Spinner from "../components/layouts/spinner/Spinner";
import GuestManagement from "./guest-managment/guest-managment";
import { MuiThemeSupportedLocales } from "../interfaces/Locales";

interface RouteViews {
  home: string;
  registration: string;
  login: string;
  myProfile: string;
  eventDetails: string;
  guestManagement: string;
}

export const routes: RouteViews = {
  home: "/",
  registration: "/registration",
  login: "/login",
  myProfile: "/my-profile",
  eventDetails: "/event-details",
  guestManagement: "/guest-management",
};

export const optionRoutes = [
  {
    title: "header.menu.overall_status",
    icon: <PlaylistAddCheckIcon className={"my-icons"} />,
    route: routes.myProfile,
  },
  {
    title: "header.menu.event_details",
    icon: <EventNoteIcon className={"my-icons"} />,
    route: routes.eventDetails,
  },
  {
    title: "header.menu.invited_management",
    icon: <PeopleOutlineIcon className={"my-icons"} />,
    route: routes.guestManagement,
  },
  {
    title: "header.menu.rsvp",
    icon: <MarkunreadMailboxIcon className={"my-icons"} />,
    route: "/rsvp",
  },
  // {
  //   title: "header.menu.seating_arrangement",
  //   icon: <BorderVerticalIcon className={"my-icons"} />,
  //   route: "/seating-arrangement",
  // },
  // {
  //   title: "header.menu.expenses_summary",
  //   icon: <AttachMoneyIcon className={"my-icons"} />,
  //   route: "/expenses-summary",
  // },
  {
    title: "header.menu.account_settings",
    icon: <SettingsIcon className={"my-icons"} />,
    route: "/account-settings",
  },
];

interface Props {
  setMuiThemeLocal: React.Dispatch<
    React.SetStateAction<MuiThemeSupportedLocales>
  >;
}

const AppViews: React.FC<Props> = ({ setMuiThemeLocal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const application = useSelector(StateSelectors.application);

  React.useEffect(() => {
    const routesList = Object.values(routes);
    if (
      !application.auth.isLoggedIn &&
      routesList.includes(location.pathname)
    ) {
      navigate(routes.login, { replace: true });
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Header application={application} setMuiThemeLocal={setMuiThemeLocal} />
      <Container
        fixed
        style={{
          top: "20px",
          padding: "0 5vw",
          position: "relative",
        }}
      >
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.registration} element={<Registration />} />
          <Route path={routes.login} element={<Login />} />
          {application.auth.isLoggedIn && (
            <>
              <Route path={routes.myProfile} element={<GuestManagement />} />
              <Route path={routes.eventDetails} element={<EventDetails />} />
              <Route
                path={routes.guestManagement}
                element={<GuestManagement />}
              />
            </>
          )}
          <Route path="*" element={<NotFound_404 />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};
export default AppViews;
