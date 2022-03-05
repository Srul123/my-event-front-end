import React from "react";
import {useSelector} from "react-redux";
import AppBarDefault from "./app-bar-default/AppBarDefault";
import {UserState} from "../../../redux-modules/selectores/stateSelectores";
import useWindowDimensionsService from "../../../services/windowScreenDimensions.service";
import AppBarDesktopLoggedIn from "./app-bar-desktop-logged-in/AppBarDesktopLoggedIn";
import AppBarMobileLoggedIn from "./app-bar-mobile-logged-in/AppBarMobileLoggedIn";


const Header: React.FC = () => {
    const {width} = useWindowDimensionsService();
    // const {width} = {width: 700};
    const isLoggedIn = useSelector(UserState.getAuthUser);

    return <header>
        {(() => {
            if (!isLoggedIn) {
                return (
                    <AppBarDefault/>
                )
            } else {
                if (width > 700) {
                    return (
                            <AppBarDesktopLoggedIn/>
                    )
                } else {
                    return (
                        <AppBarMobileLoggedIn />
                    )
                }
            }
        })()}
    </header>;
}

export default Header;

