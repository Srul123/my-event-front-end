import React from "react";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DialogContent from "@mui/material/DialogContent";
import AlertToast, { AlertPopup } from "../alerts/AlertToast";
import DialogTitle from "@mui/material/DialogTitle";
import EventInvitedGuestsOwnerControl from "../event-invited-guests-owner-control/EventInvitedGuestsOwnerControl";
import { useTranslation } from "react-i18next";

export interface EventInvitedGuestsOwnerModalProps {
  openInvitedGuestOwnerModal: boolean;
  setOpenEventInvitedGuestsOwnerModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const EventInvitedGuestsOwnerModal: React.FC<
  EventInvitedGuestsOwnerModalProps
> = ({ openInvitedGuestOwnerModal, setOpenEventInvitedGuestsOwnerModal }) => {
  const { t } = useTranslation();
  const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const closeAlert = () => {
    setAlertPopup({ ...alertPopup, open: false });
  };

  const handleClose = () => {
    setOpenEventInvitedGuestsOwnerModal(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openInvitedGuestOwnerModal}
        fullWidth
      >
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" align="center">
              <PermContactCalendarIcon
                style={{
                  position: "relative",
                  top: "0.5vh",
                  fontSize: "1em",
                }}
              />{" "}
              {t("invited_guest.guests_owner_modal.title")}
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <EventInvitedGuestsOwnerControl setAlertPopup={setAlertPopup} />
        </DialogContent>

        <AlertToast alertPopup={alertPopup} closeAlert={closeAlert} />
      </Dialog>
    </div>
  );
};

export default EventInvitedGuestsOwnerModal;
