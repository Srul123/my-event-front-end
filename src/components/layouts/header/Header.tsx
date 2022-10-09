import React from "react";
import AppBarDefault from "./app-bar-default/AppBarDefault";
import AppBarDesktopLoggedIn from "./app-bar-desktop-logged-in/AppBarDesktopLoggedIn";
import AppBarMobileLoggedIn from "./app-bar-mobile-logged-in/AppBarMobileLoggedIn";
import { devicesModes, MuiThemeSupportedLocales } from "../../../interfaces/Locales";
import { ApplicationReducer } from "../../../redux-modules/reducers/appReducer";


interface Props {
    application: ApplicationReducer,
    setMuiThemeLocal:  React.Dispatch<React.SetStateAction<MuiThemeSupportedLocales>>
}

const Header: React.FC<Props> = ({ application, setMuiThemeLocal }) => {

  return (
    <header>
      {(() => {
        if (!application.auth.isLoggedIn) {
          return <AppBarDefault setMuiThemeLocal={setMuiThemeLocal} />;
        } else {
          if (application.local.device === devicesModes.mobile) {
            return <AppBarMobileLoggedIn setMuiThemeLocal={setMuiThemeLocal}/>;
          } else {
            return <AppBarDesktopLoggedIn setMuiThemeLocal={setMuiThemeLocal} />;
          }
        }
      })()}
    </header>
  );
};

export default Header;
