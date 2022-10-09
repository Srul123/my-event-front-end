import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert, {AlertColor} from "@mui/material/Alert";

export interface AlertPopup {
    open: boolean,
    vertical: "top" | "bottom",
    horizontal: "left" | "center" | "right",
    severityInfo?:  'success' | 'info' | 'warning' | 'error' | undefined,
    messageInfo?: string
    time?: number
}

interface Props {
    alertPopup: AlertPopup,
    closeAlert: React.SyntheticEvent<any> | Event | any
}


const AlertToast: React.FC<Props> = ({alertPopup, closeAlert}) => {

    const {open, vertical, horizontal, severityInfo, messageInfo, time} = alertPopup;

    return (
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            onClose={closeAlert}
            key={vertical + horizontal}
            autoHideDuration={time ? time : 4000}
        >
            <Alert onClose={closeAlert} severity={severityInfo}>
                <span style={{margin:"0 1em"}}> {messageInfo}</span>
            </Alert>
        </Snackbar>
    );
};

export default AlertToast;