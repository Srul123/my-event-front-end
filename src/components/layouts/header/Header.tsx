import React from "react";
import {useSelector} from "react-redux";
import AppBarDefault from "./app-bar-default/AppBarDefault";
import {UserState} from "../../../redux-modules/selectores/stateSelectores";
import useWindowDimensionsService from "../../../services/windowScreenDimensions.service";
import AppBarDesktopLoggedIn from "./app-bar-desktop-logged-in/AppBarDesktopLoggedIn";


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
                if (width > 350) {
                    return (
                            <AppBarDesktopLoggedIn/>
                    )
                } else {
                    return (<div>
                        In Mobile
                    </div>)
                }
            }
        })()}
    </header>;
}

export default Header;

