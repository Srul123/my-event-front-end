import React from "react";

import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import { useSelector } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { StateSelectors } from "../../../redux-modules/selectores/stateSelectores";
import { InvitedGuest } from "../../../interfaces/InvitedGuest";
import { useTranslation } from "react-i18next";

interface Props {
  numSelected: any;
  deleteSelected: any;
  sumOfRecords: any;
  totalInvitedSum: any;
  recordsSumFiltered: any;
  rowsFull: InvitedGuest[];
  rowsFiltered: InvitedGuest[];
}

const ToolbarInvitedGuestsTable: React.FC<Props> = ({
  numSelected,
  deleteSelected,
  sumOfRecords,
  totalInvitedSum,
  recordsSumFiltered,
  rowsFull,
  rowsFiltered,
}) => {
  const { t } = useTranslation();
  let invitedSumFiltered = calcTotalInvitedSumAfterFilters();

  function calcTotalInvitedSumAfterFilters() {
    let sumOfInvitedToShow = 0;
    rowsFiltered.forEach((invited) => {
      sumOfInvitedToShow += invited.totalGuests;
    });
    return sumOfInvitedToShow;
  }

  const handleExportToExcel = (data: any) => {
    // prepareDataForExportToExcel(data, user.firstName, eventOwnersList, groups);
  };

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {`${numSelected} ${t("invited_managment.selected")}`}
        </Typography>
      ) : (
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "large" }}>
              {`${t("invited_managment.sum_of_records")}: ${sumOfRecords} | ${t(
                "invited_managment.total_guests"
              )}: 
              ${totalInvitedSum}`}
            </div>
            <div>
              <Tooltip title={`${t("invited_managment.export")}`}>
                <IconButton
                  style={{
                    position: "relative",
                    bottom: "5px",
                    margin: "0 1vw",
                    padding: "1vh 0",
                  }}
                  aria-label="edit"
                  onClick={() => handleExportToExcel(rowsFull)}
                >
                  <VerticalAlignTopIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div>
            {sumOfRecords !== recordsSumFiltered && (
              <>
                <span style={{ fontWeight: "bold", fontSize: "medium" }}>
                  {`${t("invited_managment.found")} ${recordsSumFiltered} ${t(
                    "invited_managment.records"
                  )}
                   ${invitedSumFiltered} ${t(
                    "invited_managment.invited_guests"
                  )}`}
                </span>
                <Tooltip title={`${t("invited_managment.export_filter_list")}`}>
                  <IconButton
                    onClick={() => handleExportToExcel(rowsFiltered)}
                    style={{
                      position: "relative",
                      bottom: "5px",
                      padding: "1vh 0",
                    }}
                    aria-label="edit"
                  >
                    <VerticalAlignTopIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          <Tooltip title={`${t("invited_managment.delete")}`}>
            <IconButton onClick={() => deleteSelected()} aria-label="delete">
              <DeleteIcon style={{ color: "#D32F2F" }} />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ) : null}
    </Toolbar>
  );
};

export default ToolbarInvitedGuestsTable;
