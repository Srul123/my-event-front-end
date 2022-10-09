import React from "react";
import Table from "@mui/material//Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@mui/material/Popover";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import {
  InvitedGuest,
} from "../../interfaces/InvitedGuest";
import ToolbarInvitedGuestsTable from "./toolbar-invited-guests-table/ToolbarInvitedGuestsTable";
import HeaderInvitedGuestsTable, { InvitedGuestFields } from "./header-invited-guests-table/HeaderInvitedGuestsTable";
import { StateSelectors } from "../../redux-modules/selectores/stateSelectores";
import {
  getComparator,
  stableSort,
} from "../../services/sortFunctions.service";
import { useTranslation } from "react-i18next";

const ORDER_ASCENDING = "asc";

interface Props {
  invitedList: any;
  invitedListFiltered: any;
  setEditOpenInviterDialog: any;
  totalInvitedSum: any;
}

const InvitedGuestsTable: React.FC<Props> = ({
  invitedList,
  invitedListFiltered,
  setEditOpenInviterDialog,
  totalInvitedSum,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<any>(ORDER_ASCENDING);
  const [orderBy, setOrderBy] = React.useState<any>(InvitedGuestFields().name);
  const eventOwners = useSelector(StateSelectors.eventOwners);
  const groups = useSelector(StateSelectors.groups);
  const [selected, setSelected] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleClickOnCheckbox = (id: any) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const deleteSelected = () => {
    selected.forEach((inviterID) => {
      console.log("id delete");
      console.log(inviterID);
      // deleteInviter(inviterID);
    });
    setSelected([]);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: any) => selected.indexOf(id) !== -1;
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, invitedListFiltered.length - page * rowsPerPage);

  const riseEditInviterModal = (row: any) => {
    // setCurInviter(row);
    // setEditOpenInviterDialog(true);
  };

  return (
    <div className={"InvitersTable"} style={{ marginBottom: "7vh" }}>
      <Paper>
        <ToolbarInvitedGuestsTable
          numSelected={selected.length}
          deleteSelected={deleteSelected}
          sumOfRecords={invitedList.length}
          totalInvitedSum={totalInvitedSum}
          recordsSumFiltered={invitedListFiltered.length}
          rowsFull={invitedList}
          rowsFiltered={invitedListFiltered}
        />

        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <HeaderInvitedGuestsTable
              order={order}
              setOrder={setOrder}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
            {invitedListFiltered.length === 0 && (
              <TableBody className={"TableBody"}>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: "medium",
                      fontWeight: "bold",
                    }}
                  >
                    {t("invited_managment.no_invited")}
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableBody>
            )}
            <TableBody className={"TableBody"}>
              {stableSort(invitedListFiltered, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: InvitedGuest, index: number) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const group = groups.groupList.find((group) => {
                    return row.group === group._id;
                  });
                  const owner = eventOwners.eventOwnerList.find((owner) => {
                    return row.eventOwner === owner._id;
                  });
                  return (
                    <TableRow hover tabIndex={-1} key={row._id}>
                      <TableCell padding="checkbox">
                        {isItemSelected ? (
                          <Checkbox
                            onClick={(event) => handleClickOnCheckbox(row._id)}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            color={"error"}
                          />
                        ) : (
                          <Tooltip title="Select for delete">
                            <Checkbox
                              onClick={(event) =>
                                handleClickOnCheckbox(row._id)
                              }
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell id={"edit-icon"}>
                        <Tooltip title="Click to edit">
                          <IconButton
                            onClick={() => riseEditInviterModal(row)}
                            aria-label="edit"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell id={"fullName"}>{row.name}</TableCell>
                      <TableCell>{row.totalGuests}</TableCell>
                      <TableCell>
                        <PopupState
                          variant="popover"
                          popupId="demo-popup-popover"
                        >
                          {(popupState) => (
                            <div
                              className={"header-list-name"}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Tooltip title={"Click for more details"}>
                                <IconButton {...bindTrigger(popupState)}>
                                  <span
                                    style={{
                                      fontSize: "0.6em",
                                      marginRight: "0.5vw",
                                    }}
                                  >
                                    {row.arrivalStatus}
                                  </span>
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
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
                                <div style={{ padding: "1vw" }}>
                                {t("invited_managment.updated")}:
                                  <br />
                                  {t("invited_managment.date")}:
                                </div>
                              </Popover>
                            </div>
                          )}
                        </PopupState>
                      </TableCell>
                      <TableCell>{group?.name}</TableCell>
                      <TableCell>{owner?.name}</TableCell>
                      <TableCell>Need Shuttle test</TableCell>
                      <TableCell id={"comments"}>
                        <PopupState
                          variant="popover"
                          popupId="demo-popup-popover"
                        >
                          {(popupState) => (
                            <div
                              className={"header-list-name"}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Tooltip title={"Click to see comments"}>
                                <IconButton {...bindTrigger(popupState)}>
                                  <ChatBubbleOutlineIcon />
                                </IconButton>
                              </Tooltip>
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
                                <div style={{ padding: "1vw" }}>
                                  {row.comments.length > 0 ? (
                                    <span>{row.comments}</span>
                                  ) : (
                                    <span> {t("invited_managment.no_comments")}</span>
                                  )}
                                </div>
                              </Popover>
                            </div>
                          )}
                        </PopupState>
                      </TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={invitedListFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default InvitedGuestsTable;
