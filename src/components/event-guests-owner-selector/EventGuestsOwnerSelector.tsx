import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { EventOwner } from "../../interfaces/EventOwner";

interface Props {
  eventOwnerList: EventOwner[];
  owner: EventOwner;
  setOwner: React.Dispatch<React.SetStateAction<any>>;
}

const EventGuestsOwnerSelector: React.FC<Props> = ({
  eventOwnerList,
  setOwner,
  owner,
}) => {
  return (
    <Autocomplete
      key={owner ? owner._id : "0"}
      fullWidth
      autoHighlight
      options={[...eventOwnerList, { _id: "0", name: "" }]}
      renderInput={(params) => (
        <TextField {...params} label={"Select an owner"} variant="outlined" />
      )}
      getOptionLabel={(owner) => {
        return `${owner.name}`;
      }}
      onChange={(event, selectedValue, reason) => {
        console.log(reason);
        if (reason === "selectOption") {
          setOwner(selectedValue);
        }
        if (selectedValue?._id !== "0" && reason === "clear") {
          setOwner({ _id: "0", name: "" });
        }
      }}
      value={owner}
      isOptionEqualToValue={(option, value) => option._id === value._id}
    />
  );
};

export default EventGuestsOwnerSelector;
