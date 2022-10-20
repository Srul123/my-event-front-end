import React, { ComponentType } from "react";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface DialogModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  Icon?: ComponentType<any>;
  children?: React.ReactNode;
}

const DialogModal: React.FC<DialogModalProps> = ({
  open,
  setOpen,
  title,
  Icon,
  children,
}) => {
  return (
    <div style={{position: "relative", zIndex: "100"}}>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            { Icon &&
                     <Icon
                     style={{
                       position: "relative",
                       top: "0.5vh",
                       fontSize: "2em",
                     }}
                   />
            }
            <Typography variant="h4" align="center">
              {title}
            </Typography>
            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogModal;
