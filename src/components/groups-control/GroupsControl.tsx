import React, { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { StateSelectors } from "../../redux-modules/selectores/stateSelectores";
import { EventOwner } from "../../interfaces/EventOwner";
import AlertToast, { AlertPopup } from "../alerts/AlertToast";
import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { updateIsAppLoading } from "../../redux-modules/actions/appActions";
import { Group } from "../../interfaces/Group";
import EventGuestsOwnerSelector from "../event-guests-owner-selector/EventGuestsOwnerSelector";
import {
  addGroup,
  deleteGroup,
  editGroup,
} from "../../redux-modules/actions/groupActions";
import Spinner from "../layouts/spinner/Spinner";

const GroupsControl: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const app = useSelector(StateSelectors.application);
  const eventOwnerList = useSelector(StateSelectors.eventOwners).eventOwnerList;
  const groupList = useSelector(StateSelectors.groups).groupList;
  const [groupName, setGroupName] = React.useState("");
  const [owner, setOwner] = React.useState<EventOwner>({ _id: "0", name: "" });

  const [editedGroupName, setEditedGroupName] = React.useState("");
  const [editedOwner, setEditedOwner] = React.useState<EventOwner>({
    _id: "0",
    name: "",
  });

  const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const onPressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && groupName !== "") {
      handleAdd();
    }
  };

  const handleAdd = async () => {
    if (groupName.length > 20 || groupName.length < 2) {
      riseExceptionAlert(t("invited_guest.guests_owner_modal.valid_name"));
      return;
    }
    dispatch(updateIsAppLoading(true));
    const newGroup: Group =
      owner && owner.name !== ""
        ? {
            name: groupName,
            eventOwner: owner._id,
          }
        : {
            name: groupName,
          };
    try {
      await dispatch(addGroup(newGroup, app.auth.token));
      setGroupName("");
      setOwner({ _id: "0", name: "" });
      riseSuccessAlert("");
    } catch (e) {
      riseExceptionAlert("");
    } finally {
      dispatch(updateIsAppLoading(false));
    }
  };

  const handleEdit = async (group: Group) => {
    if ( // to do align validation
      (editedGroupName === "" && editedOwner._id === "0") ||
      editedGroupName.length > 20 ||
      editedGroupName.length < 2
    ) {
      riseExceptionAlert(t("invited_guest.guests_owner_modal.valid_name"));
      return;
    }
    dispatch(updateIsAppLoading(true));
    const editedGroup: Group =
      editedOwner._id === "0"
        ? {
            _id: group._id,
            name: editedGroupName,
          }
        : {
            _id: group._id,
            name: editedGroupName !== "" ? editedGroupName : group.name,
            eventOwner: editedOwner._id,
          };
    try {
      await dispatch(editGroup(editedGroup, app.auth.token));
      setEditedGroupName("");
      setEditedOwner({ name: "", _id: "0" });
      riseSuccessAlert(t("invited_guest.guests_owner_modal.edit_success"));
    } catch (e) {
      riseExceptionAlert(t("invited_guest.guests_owner_modal.edit_error"));
    } finally {
      dispatch(updateIsAppLoading(false));
    }
  };

  const handleDelete = async (groupToDelete: Group) => {
    if (
      window.confirm(
        `${t("invited_guest.guests_owner_modal.delete_owner")} ${
          groupToDelete.name
        }?`
      ) === true
    ) {
      debugger;
      dispatch(updateIsAppLoading(true));
      try {
        await dispatch(deleteGroup(groupToDelete._id, app.auth.token));
        riseSuccessAlert(t("invited_guest.guests_owner_modal.delete_success"));
      } catch (e) {
        riseExceptionAlert(t("invited_guest.guests_owner_modal.delete_error"));
      } finally {
        dispatch(updateIsAppLoading(false));
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

  const findGroupOwner = (group: Group) => {
    for (const owner of eventOwnerList) {
      if (group.eventOwner === owner._id) return owner;
    }
    return { name: "", _id: "0" };
  };

  return (
    <>
      {app.isAppLoading && <Spinner />}
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-required"
            style={{ marginBottom: "1vh" }}
            label={`* ${t("invited_guest.guests_owner_modal.add_name")}`}
            value={groupName}
            onChange={(event) => {
              setGroupName(event.target.value);
            }}
            onKeyPress={(event) => onPressEnter(event)}
          />
        </Grid>
        <Grid item xs={12}>
          <EventGuestsOwnerSelector
            eventOwnerList={eventOwnerList}
            setOwner={setOwner}
            owner={owner}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: "1vh" }}>
        <Tooltip title={`${t("invited_guest.guests_owner_modal.click_save")}`}>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            {t("invited_guest.guests_owner_modal.save")}
          </Button>
        </Tooltip>
      </div>
      <List component="nav" aria-label="contacts">
        {groupList.map((group, index) => {
          const curOwner = findGroupOwner(group);
          return (
            <div key={group._id}>
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
                            {`${index + 1}. ${group.name} `}
                          </Typography>
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Tooltip
                          title={`${t(
                            "invited_guest.guests_owner_modal.delete"
                          )}`}
                        >
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(group)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
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
                            defaultValue={group.name}
                            type={"text"}
                            label={`${t(
                              "invited_guest.guests_owner_modal.label_owner"
                            )}`}
                            variant="outlined"
                            onChange={(event) => {
                              setEditedGroupName(event.target.value);
                            }}
                          />
                          <FormControl fullWidth>
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                            >
                              Owner
                            </InputLabel>
                            <NativeSelect
                              defaultValue={
                                curOwner._id !== "0" ? curOwner._id : "0"
                              }
                              inputProps={{
                                name: "age",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event: {
                                target: { value: string };
                              }) => {
                                const selectedOwnerId = event.target.value;
                                const selectedOwner = eventOwnerList.find(
                                  (owner) => owner._id === selectedOwnerId
                                );
                                console.log(selectedOwner);
                                setEditedOwner(
                                  selectedOwner
                                    ? selectedOwner
                                    : { name: "", _id: "0" }
                                );
                              }}
                            >
                              <option value={"0"}>No owner</option>
                              {eventOwnerList.map((owner) => {
                                return (
                                  <option key={owner._id} value={owner._id}>
                                    {owner.name}
                                  </option>
                                );
                              })}
                            </NativeSelect>
                          </FormControl>
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
                              onClick={() => handleEdit(group)}
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
      <AlertToast
        alertPopup={alertPopup}
        closeAlert={() => setAlertPopup({ ...alertPopup, open: false })}
      />
    </>
  );
};

export default GroupsControl;
