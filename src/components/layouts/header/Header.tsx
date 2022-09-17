import React from "react";
import {useSelector} from "react-redux";
import AppBarDefault from "./app-bar-default/AppBarDefault";
import AppBarDesktopLoggedIn from "./app-bar-desktop-logged-in/AppBarDesktopLoggedIn";
import AppBarMobileLoggedIn from "./app-bar-mobile-logged-in/AppBarMobileLoggedIn";
import { devicesModes} from "../../../interfaces/Locales";
import {StateSelectors} from "../../../redux-modules/selectores/stateSelectores";


const Header: React.FC = () => {
    const application = useSelector(StateSelectors.application);

    return <header>
        {(() => {
            if (!application.isLoggedIn) {
                return (
                    <AppBarDefault/>
                )
            } else {
                if (application.local.device === devicesModes.mobile) {
                    return (
                        <AppBarMobileLoggedIn/>
                    )
                } else {
                    return (
                        <AppBarDesktopLoggedIn/>
                    )
                }
            }
        })()}
    </header>;
}

export default Header;

