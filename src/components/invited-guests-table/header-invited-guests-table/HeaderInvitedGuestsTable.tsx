import React, { Dispatch, SetStateAction } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import TableSortLabel from "@mui/material/TableSortLabel";
import PersonIcon from "@mui/icons-material/Person";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PeopleIcon from "@mui/icons-material/People";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import InfoIcon from "@mui/icons-material/Info";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useTranslation } from "react-i18next";
import i18n  from "i18next";


 export const InvitedGuestFields = () => {
  return {
    eventOwner: i18n.t("invited_guest.event_owner"),
    group: i18n.t("invited_guest.group"),
    shuttle: i18n.t("invited_guest.shuttle"),
    name: i18n.t("invited_guest.name"),
    totalGuests: i18n.t("invited_guest.total_guests"),
    phoneNumber: i18n.t("invited_guest.phone_number"),
    email: i18n.t("invited_guest.email"),
    arrivalStatus: i18n.t("invited_guest.arrival_status"),
    comments: i18n.t("invited_guest.comments"),
  }
}

export const prepareTableHeadData = () => {
  const headCells = [
    { id: "delete", numeric: false, label: "", icon: "" },
    { id: "edit", numeric: false, label: "", icon: "" },
    {
      id: InvitedGuestFields().name,
      numeric: false,
      label: `${i18n.t("invited_managment.sort_by")} ${InvitedGuestFields().name}`,
      icon: <PersonIcon />,
    },
    {
      id: InvitedGuestFields().totalGuests,
      numeric: true,
      label: `${i18n.t("invited_managment.sort_by")} ${InvitedGuestFields().totalGuests}`,
      icon: <FormatListNumberedRtlIcon />,
    },
    {
      id: InvitedGuestFields().arrivalStatus,
      numeric: false,
      label: InvitedGuestFields().arrivalStatus,
      icon: <ContactMailIcon />,
    },
    {
      id: InvitedGuestFields().group,
      numeric: false,
      label: InvitedGuestFields().group,
      icon: <PeopleIcon />,
    },
    {
      id: InvitedGuestFields().eventOwner,
      numeric: false,
      label: InvitedGuestFields().eventOwner,
      icon: <PermContactCalendarIcon />,
    },
    {
      id: InvitedGuestFields().shuttle,
      numeric: true,
      label: InvitedGuestFields().shuttle,
      icon: <DirectionsBusIcon />,
    },
    {
      id: InvitedGuestFields().comments,
      numeric: false,
      label: InvitedGuestFields().comments,
      icon: <InfoIcon />,
    },
    {
      id: InvitedGuestFields().phoneNumber,
      numeric: false,
      label: InvitedGuestFields().phoneNumber,
      icon: <ContactPhoneIcon />,
    },
    {
      id: InvitedGuestFields().email,
      numeric: false,
      label: InvitedGuestFields().email,
      icon: <AlternateEmailIcon />,
    },
  ];
  return headCells;
};

const ORDER_ASCENDING = "asc";
const ORDER_DESCENDING = "desc";

interface Props {
  order:  "asc" | "desc" | undefined;
  setOrder: Dispatch<SetStateAction<string>>;
  orderBy:  "asc" | "desc" | undefined;
  setOrderBy: Dispatch<SetStateAction<string>>;
}

const HeaderInvitedGuestsTable: React.FC<Props> = ({
  order,
  setOrder,
  orderBy,
  setOrderBy,
}) => {
  const { t } = useTranslation();
  const headCells = prepareTableHeadData();
  const handleRequestSort = (event: any, property: React.SetStateAction<string> | any) => {
    const isAsc = orderBy === property && order === ORDER_ASCENDING;
    setOrder(isAsc ? ORDER_DESCENDING : ORDER_ASCENDING);
    setOrderBy(property);
  };

  const createSortHandler = (property: string) => (event: any) => {
    handleRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => {
          let headCellValue;
          let paddingZeroStyle = index > 0 ? {} : { padding: "0" };
          const isSortAbleHeadCell =
            headCell.id === InvitedGuestFields().name ||
            headCell.id === InvitedGuestFields().totalGuests;
          if (isSortAbleHeadCell) {
            headCellValue = (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : ORDER_ASCENDING}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.icon}
              </TableSortLabel>
            );
          } else {
            headCellValue = headCell.icon;
          }

          return (
            <Tooltip title={headCell.label} key={index}>
              <TableCell
                key={headCell.id}
                // align={headCell.numeric ? 'right' : 'left'}
                align={"center"}
                style={paddingZeroStyle}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCellValue}
              </TableCell>
            </Tooltip>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default HeaderInvitedGuestsTable;
