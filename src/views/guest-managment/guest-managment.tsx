import React from "react";
import { useSelector } from "react-redux";
import InvitedGuestsTable from "../../components/invited-guests-table/InvitedGuestsTable";
import SpeedDialsInvitedGuestManagement from "../../components/speed-dials/SpeedDialsInvitedGuestManagement";

const GuestManagement: React.FC = () => {
  return (
    <div id="GuestManagement" style={{position: "relative"}}>
        <SpeedDialsInvitedGuestManagement
          setOpenInviterDialog={() => console.log()}
          setOpenGroupsDialog={() => console.log()}
          setOpenInvitedOwner={() => console.log()}
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
  );
};

export default GuestManagement;
