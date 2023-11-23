// import React from 'react'
import { useSelector } from "react-redux";

function ProfileContainerList() {
  const userData = useSelector((state) => state.user.singleUserData);
  console.log("userData", userData);
  return (
    <div className="ProfileContainerList">
      <div className="left_Action">
        <h5>{`Name : ${userData?.name}`}</h5>
        <h6>{`Username : ${userData?.username}`}</h6>
      </div>
      <div className="right_Action">
        <h5>{`${userData?.address?.suite}, ${userData?.address?.street},${userData?.address?.city}`}</h5>
        <h6>{`${userData?.email} | ${userData?.phone}`}</h6>
      </div>
    </div>
  );
}

export default ProfileContainerList;
