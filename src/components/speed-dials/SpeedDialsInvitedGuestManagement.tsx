import React, { Dispatch, SetStateAction } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TagIcon from "@mui/icons-material/Tag";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StateSelectors } from "../../redux-modules/selectores/stateSelectores";
import { CssBaseline } from "@mui/material";
import { anchorSides, DeviceModesValues } from "../../interfaces/Locales";

interface Props {
  setOpenInvitedGuestDialogModal: Dispatch<SetStateAction<boolean>>;
  setOpenGroupsDialogModal: Dispatch<SetStateAction<boolean>>;
  setOpenEventInvitedGuestsOwnerModal: Dispatch<SetStateAction<boolean>>;
  setOpenTagsDialogModal: Dispatch<SetStateAction<boolean>>;
  setOpenShuttleListDialogModal: Dispatch<SetStateAction<boolean>>;
  setLoadGuestsContactsDialogModal: Dispatch<SetStateAction<boolean>>;
}

const SpeedDialsInvitedGuestManagement: React.FC<Props> = ({
  setOpenInvitedGuestDialogModal,
  setOpenGroupsDialogModal,
  setOpenEventInvitedGuestsOwnerModal,
  setOpenTagsDialogModal,
  setOpenShuttleListDialogModal,
  setLoadGuestsContactsDialogModal,
}) => {
  const { t } = useTranslation();
  const application = useSelector(StateSelectors.application);
  const [openSpeedDials, setSpeedDials] = React.useState(false);
  const actions = [
    {
      icon: <PersonAddIcon />,
      name: t("speed_dial.add_guest"),
      action: "addInvited",
    },
    {
      icon: <PeopleIcon />,
      name: t("speed_dial.groups"),
      action: "openGroups",
    },
    {
      icon: <PermContactCalendarIcon />,
      name: t("speed_dial.invited_guest_owner"),
      action: "openInvitedOwner",
    },
    {
      icon: <TagIcon />,
      name: t("speed_dial.tags"),
      action: "openTags",
    },
    {
      icon: <DirectionsBusIcon />,
      name: t("speed_dial.shuttles"),
      action: "openShuttleList",
    },
    {
      icon: <FileDownloadIcon />,
      name: t("speed_dial.load_external"),
      action: "openLoadContacts",
    },
  ];
  const handleOnClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    action: string
  ) => {
    setSpeedDials(false);
    if (action === "addInvited") {
      setOpenInvitedGuestDialogModal(true);
    }
    if (action === "openGroups") {
      setOpenGroupsDialogModal(true);
    }
    if (action === "openInvitedOwner") {
        setOpenEventInvitedGuestsOwnerModal(true);
    }
    if (action === "openTags") {
      setOpenTagsDialogModal(true);
  }
    if (action === "openShuttleList") {
      setOpenShuttleListDialogModal(true);
    }
    if (action === "openLoadContacts") {
      setLoadGuestsContactsDialogModal(true);
    }
  };

  const handleOpen = () => {
    setSpeedDials(true);
  };
 
  return (
    <div style={{ position: "fixed", zIndex: 100 }}>
      <SpeedDial
        ariaLabel="SpeedDial Invited"
        hidden={false}
        icon={<SpeedDialIcon />}
        onClick={() => setSpeedDials(!openSpeedDials)}
        onOpen={handleOpen}
        open={openSpeedDials}
        direction={
          application.local.device === DeviceModesValues.mobile
            ? anchorSides.down
            : anchorSides.right
        }
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(event) => {
              handleOnClick(event, action.action);
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default SpeedDialsInvitedGuestManagement;
