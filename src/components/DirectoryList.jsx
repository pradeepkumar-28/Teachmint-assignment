/* eslint-disable react/prop-types */

import { Typography } from "@mui/material";

function DirectoryList({ data, onUserListClickHandler, postCount }) {
  return (
    <div
      className="DirectoryList_conntent"
      onClick={() => onUserListClickHandler()}
    >
      <div className="left_Action">
        <Typography
          variant="h1"
          className="DirectoryList_title"
        >{`Name : ${data?.name}`}</Typography>
      </div>
      <div className="right_Action">
        <Typography
          variant="h6"
          className="DirectoryList_title"
        >{`Post : ${postCount}`}</Typography>
      </div>
    </div>
  );
}

export default DirectoryList;
