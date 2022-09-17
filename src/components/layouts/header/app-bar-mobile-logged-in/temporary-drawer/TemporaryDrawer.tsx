import {anchorSides, Local} from "../../../../../interfaces/Locales";
import * as React from "react";
import {useTranslation} from "react-i18next";
import List from "@mui/material/List";
import {optionRoutes} from "../../../../../views/AppViews";
import {NavLink} from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Drawer from "@mui/material/Drawer";
import colors from "../../../../../styles/colors.module.scss";
import "./TemporaryDrawer.scss";


interface Props {
    openDrawer: any;
    toggleDrawer: any;
    local: Local;
}

const TemporaryDrawer: React.FC<Props> = ({openDrawer, toggleDrawer, local}) => {
    const {t} = useTranslation();
    const anchorSide = local.side;
    return (
        <div>
            <Drawer anchor={local.side} open={openDrawer} onClose={toggleDrawer(local.side, false)}>
                <div
                    role="presentation"
                    onClick={toggleDrawer(anchorSide, false)}
                    onKeyDown={toggleDrawer(anchorSide, false)}
                    style={{direction: "initial"}}
                >
                    <List id={"TemporaryDrawer"}>
                        {optionRoutes.map((option, index) => {
                                let sideFlexDirectionStyle = {};
                                let sideJustifyContentStyle = {justifyContent:"flex-end"};
                                if (anchorSide === anchorSides.left) {
                                    sideFlexDirectionStyle = {
                                        flexDirection: "row-reverse"
                                    };
                                    sideJustifyContentStyle = {justifyContent:""};
                                }
                                return (
                                    <NavLink
                                        style={{textDecoration: "none", color: colors.textBlack}}
                                        to={option.route}
                                        className={(navData) => navData.isActive ? "active" : ""}
                                        key={index}
                                    >
                                        {
                                            index === optionRoutes.length - 1 &&
                                            <Divider/>
                                        }
                                        <ListItem button key={index}>
                                            <div style={{display: "flex", width: "100%", ...sideFlexDirectionStyle}}>
                                                <ListItemText primary={`${t(option.title)}`}/>
                                                <ListItemIcon style={{...sideJustifyContentStyle}}>{option.icon}</ListItemIcon>
                                            </div>
                                        </ListItem>
                                    </NavLink>
                                )
                            }
                        )}
                    </List>
                    <Divider/>
                </div>
            </Drawer>
        </div>
    );
}

export default TemporaryDrawer;