import React from "react";
import { useSelector } from "react-redux";
import InvitedGuestsTable from "../../components/invited-guests-table/InvitedGuestsTable";
import EventInvitedGuestsOwner from "../../components/dialog-modals/EventInvitedGuestsOwnerModal";
import SpeedDialsInvitedGuestManagement from "../../components/speed-dials/SpeedDialsInvitedGuestManagement";

const GuestManagement: React.FC = () => {
  const [openInvitedGuestOwnerModal, setOpenEventInvitedGuestsOwnerModal] = React.useState(false);
  return (
    <>
      <div id="GuestManagement" style={{ position: "relative" }}>
        <SpeedDialsInvitedGuestManagement
          setOpenInviterDialog={() => console.log()}
          setOpenGroupsDialog={() => console.log()}
          setOpenEventInvitedGuestsOwnerModal={setOpenEventInvitedGuestsOwnerModal}
          setOpenShuttleList={() => console.log()}
          setLoadContactsDialog={() => console.log()}
        />
        <InvitedGuestsTable
          invitedList={[]}
          invitedListFiltered={[]}
          setEditOpenInviterDialog={() => console.log("")}
          totalInvitedSum={0}
        />
      </div>
      <EventInvitedGuestsOwner
        openInvitedGuestOwnerModal={openInvitedGuestOwnerModal}
        setOpenEventInvitedGuestsOwnerModal={setOpenEventInvitedGuestsOwnerModal}
      />
    </>
  );
};

export default GuestManagement;
