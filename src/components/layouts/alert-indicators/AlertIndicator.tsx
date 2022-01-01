import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert, {AlertColor} from "@mui/material/Alert";

export interface AlertPopup {
    open: boolean,
    vertical: "top" | "bottom",
    horizontal:  "left" | "center" | "right",
    severityInfo?: AlertColor | undefined,
    messageInfo?: string
}

interface Props {
    alertPopup: AlertPopup,
    closeAlert:   React.SyntheticEvent<any> | Event | any
}


const AlertIndicator: React.FC<Props> = ({alertPopup, closeAlert}) => {

    const {open, vertical, horizontal, severityInfo, messageInfo} = alertPopup;


    return (
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            onClose={closeAlert}
            key={vertical + horizontal}
            autoHideDuration={4000}
        >
            <Alert onClose={closeAlert} severity={severityInfo}>
                {messageInfo}
            </Alert>
        </Snackbar>
    );
}

export default AlertIndicator;