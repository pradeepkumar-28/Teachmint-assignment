/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Dropdown({
  data,
  onDropdownSelectHandler,
  selectedCountry,
}) {

  

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Country" />}
      onChange={onDropdownSelectHandler}
      value={selectedCountry}
     
    />
  );
}
