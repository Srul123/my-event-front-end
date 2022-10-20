import React from "react";
import { useSelector } from "react-redux";
import InvitedGuestsTable from "../../components/invited-guests-table/InvitedGuestsTable";
import SpeedDialsInvitedGuestManagement from "../../components/speed-dials/SpeedDialsInvitedGuestManagement";
import DialogModal from "../../components/dialog-modal/DialogModal";
import { useTranslation } from "react-i18next";
import EventInvitedGuestsOwnerControl from "../../components/event-invited-guests-owner-control/EventInvitedGuestsOwnerControl";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import GroupsControl from "../../components/groups-control/GroupsControl";
import { StateSelectors } from "../../redux-modules/selectores/stateSelectores";
import Spinner from "../../components/layouts/spinner/Spinner";

const GuestManagement: React.FC = () => {
  const { t } = useTranslation();
  const application = useSelector(StateSelectors.application);
  const [openInvitedGuestOwnerModal, setOpenEventInvitedGuestsOwnerModal] =
    React.useState(false);
  const [openGroupsModal, setOpenopenGroupsModal] = React.useState(false);
  return (
    <>
      <div id="GuestManagement" style={{ position: "relative" }}>
        <SpeedDialsInvitedGuestManagement
          setOpenInvitedGuestDialogModal={() =>
            console.log("setOpenInvitedGuestDialogModal modal")
          }
          setOpenGroupsDialogModal={setOpenopenGroupsModal}
          setOpenEventInvitedGuestsOwnerModal={
            setOpenEventInvitedGuestsOwnerModal
          }
          setOpenTagsDialogModal={() =>
            console.log("setOpenTagsDialogModal modal")
          }
          setOpenShuttleListDialogModal={() => console.log("Shuttle modal")}
          setLoadGuestsContactsDialogModal={() =>
            console.log("Load records contacts modal")
          }
        />
        <InvitedGuestsTable
          invitedList={[]}
          invitedListFiltered={[]}
          setEditOpenInviterDialog={() => console.log("")}
          totalInvitedSum={0}
        />
      </div>
      <DialogModal
        open={openInvitedGuestOwnerModal}
        setOpen={setOpenEventInvitedGuestsOwnerModal}
        title={t("invited_guest.guests_owner_modal.title")}
        Icon={PermContactCalendarIcon}
      >
        <EventInvitedGuestsOwnerControl />
      </DialogModal>
      <DialogModal
        open={openGroupsModal}
        setOpen={setOpenopenGroupsModal}
        title="Groups list"
      >
        <GroupsControl />
      </DialogModal>
    </>
  );
};

export default GuestManagement;
