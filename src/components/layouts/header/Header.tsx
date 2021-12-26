import React from "react";
import {useSelector} from "react-redux";
// import useWindowDimensionsService from '../../../services/useWindowDimensionsService';


const Header: React.FC = () => {
    // const {width} = useWindowDimensionsService();
    const {width} = {width: 700};

    // const isLoggedIn = useSelector((state) => {
    //     return state.userReducer.login;
    // });
    const isLoggedIn: boolean = false
    return <>
        {(() => {
            if (!isLoggedIn) {
                return (
                    <div>
                        out
                    </div>
                )
            } else {
                if (width > 350) {
                    return (
                        <div>
                            In Desktop
                        </div>
                    )
                } else {
                    return (<div>
                        In Mobile
                    </div>)
                }
            }
        })()}
    </>;
}

export default Header;

