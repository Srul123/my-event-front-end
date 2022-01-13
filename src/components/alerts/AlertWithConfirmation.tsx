import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";

interface AlertProps {
    open: boolean,
    setOpen:  React.SyntheticEvent<any> | Event | any
    title: string,
    message: string,
    action?: () => void,
    icon?: any
}

const AlertWithConfirmation: React.FC<AlertProps> = ({open, setOpen,title, message,action,icon}) => {
    const {t} = useTranslation();

    const handleClose = () => {
        setOpen(false);
        if (action) {
            action();
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title} {icon}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        {t('registration.ok')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertWithConfirmation;