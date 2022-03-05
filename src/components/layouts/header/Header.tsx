import React from "react";
import {useSelector} from "react-redux";
import AppBarDefault from "./app-bar-default/AppBarDefault";
import {LocalesState, UserState} from "../../../redux-modules/selectores/stateSelectores";
import AppBarDesktopLoggedIn from "./app-bar-desktop-logged-in/AppBarDesktopLoggedIn";
import AppBarMobileLoggedIn from "./app-bar-mobile-logged-in/AppBarMobileLoggedIn";
import { devicesModes} from "../../../types/Locales";


const Header: React.FC = () => {
    const local = useSelector(LocalesState.getCurrentLocal);
    const isLoggedIn = useSelector(UserState.getAuthUser);

    return <header>
        {(() => {
            if (!isLoggedIn) {
                return (
                    <AppBarDefault/>
                )
            } else {
                if (local.device === devicesModes.mobile) {
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

