import React, { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import FormHelperText from "@mui/material/FormHelperText";
import { StateSelectors } from "../../redux-modules/selectores/stateSelectores";
import { EventOwner } from "../../interfaces/EventOwner";
import { AlertPopup } from "../alerts/AlertToast";
import {
  addEventInvitedGuestsOwner,
  deleteEventInvitedGuestsOwner,
  editEventInvitedGuestsOwner,
} from "../../redux-modules/actions/ownerActions";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  setAlertPopup: Dispatch<SetStateAction<AlertPopup>>;
}

const EventInvitedGuestsOwnerControl: React.FC<Props> = ({ setAlertPopup }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const app = useSelector(StateSelectors.application);
  const eventInvitedOwnerList = useSelector(
    StateSelectors.eventOwners
  ).eventOwnerList;
  const [newOwnerName, setNewOwnerName] = React.useState("");
  const [editedEventOwnerName, setEditedEventOwnerName] = React.useState("");

  const onPressEnterAddEventOwner = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter" && newOwnerName !== "") {
      handleOnClickAddNewEventOwner();
    }
  };

  const handleOnClickAddNewEventOwner = async () => {
    if (newOwnerName.length > 20 || newOwnerName.length < 2) {
      riseExceptionAlert(t("invited_guest.guests_owner_modal.valid_name"));
      return;
    }

    const newOwnerToAdd: EventOwner = {
      name: newOwnerName,
      isAdmin: false,
    };
    try {
      await dispatch(addEventInvitedGuestsOwner(newOwnerToAdd, app.auth.token));
      setNewOwnerName("");
      riseSuccessAlert("");
    } catch (e) {
      riseExceptionAlert("");
    }
  };

  const handleEditEventOwner = async (ownerToEdit: EventOwner) => {
    if (editedEventOwnerName.length > 20 || editedEventOwnerName.length < 2) {
      riseExceptionAlert(t("invited_guest.guests_owner_modal.valid_name"));
      return;
    }
    const invitedOwner: EventOwner = {
      ...ownerToEdit,
      name: editedEventOwnerName,
    };
    try {
      await dispatch(editEventInvitedGuestsOwner(invitedOwner, app.auth.token));
      riseSuccessAlert(t("invited_guest.guests_owner_modal.edit_success"));
      setEditedEventOwnerName("");
    } catch (e) {
      riseExceptionAlert(t("invited_guest.guests_owner_modal.edit_error"));
    }
  };

  const handleDelete = async (eventOwnerToDelete: EventOwner) => {
    if (
      window.confirm(
        `${t("invited_guest.guests_owner_modal.delete_owner")} ${
          eventOwnerToDelete.name
        }?`
      ) === true
    ) {
      try {
        await dispatch(
          deleteEventInvitedGuestsOwner(eventOwnerToDelete._id, app.auth.token)
        );
        riseSuccessAlert(t("invited_guest.guests_owner_modal.delete_success"));
      } catch (e) {
        riseExceptionAlert(t("invited_guest.guests_owner_modal.delete_error"));
      }
    }
  };

  const riseSuccessAlert = (message: string) => {
    setAlertPopup({
      open: true,
      vertical: "top",
      horizontal: "center",
      severityInfo: "success",
      messageInfo:
        message !== ""
          ? message
          : `${t("invited_guest.guests_owner_modal.success")}`,
      time: 6000,
    });
  };

  const riseExceptionAlert = (message = "") => {
    setAlertPopup({
      open: true,
      vertical: "top",
      horizontal: "center",
      severityInfo: "error",
      messageInfo:
        message !== ""
          ? message
          : `${t("invited_guest.guests_owner_modal.failure")}`,
      time: 6000,
    });
  };

  return (
    <>
      <div>
        <div>
          <TextField
            fullWidth
            id="standard-required"
            style={{ marginBottom: "1vh" }}
            label={`* ${t("invited_guest.guests_owner_modal.add_name")}`}
            value={newOwnerName}
            onChange={(event) => {
              setNewOwnerName(event.target.value);
            }}
            onKeyPress={(event) => onPressEnterAddEventOwner(event)}
          />
        </div>
        <div style={{ display: "flex" }}></div>
      </div>
      <div style={{ marginTop: "1vh" }}>
        <Tooltip title={`${t("invited_guest.guests_owner_modal.click_save")}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnClickAddNewEventOwner}
          >
            {t("invited_guest.guests_owner_modal.save")}
          </Button>
        </Tooltip>
      </div>
      <List component="nav" aria-label="contacts">
        {eventInvitedOwnerList.map((owner, index) => {
          return (
            <div key={owner._id}>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <ListItem button {...bindTrigger(popupState)}>
                      <ListItemIcon style={{ minWidth: "1vw" }}>
                        <Tooltip
                          title={`${t(
                            "invited_guest.guests_owner_modal.click_edit"
                          )}`}
                        >
                          <Typography variant="body1" align="center">
                            {`${index + 1}. ${owner.name} `}
                          </Typography>
                        </Tooltip>
                      </ListItemIcon>
                      {!owner.isAdmin && (
                        <ListItemSecondaryAction>
                          <Tooltip
                            title={`${t(
                              "invited_guest.guests_owner_modal.delete"
                            )}`}
                          >
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(owner)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <div style={{ padding: "1vh 1vw" }}>
                        <div
                          className={"cover-tips-actions"}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1vw",
                          }}
                        >
                          <TextField
                            style={{ marginBottom: "1.5vh" }}
                            defaultValue={owner.name}
                            type={"text"}
                            label={`${t(
                              "invited_guest.guests_owner_modal.label_owner"
                            )}`}
                            variant="outlined"
                            onChange={(event) => {
                              setEditedEventOwnerName(event.target.value);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Tooltip
                            title={`${t(
                              "invited_guest.guests_owner_modal.click_save"
                            )}`}
                          >
                            <Button
                              color="primary"
                              onClick={() => handleEditEventOwner(owner)}
                            >
                              {t("invited_guest.guests_owner_modal.save")}
                              <SaveIcon />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </div>
          );
        })}
      </List>
    </>
  );
};

export default EventInvitedGuestsOwnerControl;
