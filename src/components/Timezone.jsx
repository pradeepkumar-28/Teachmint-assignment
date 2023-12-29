/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DropDown from "../components/Dropdown";
import moment from "moment-timezone";

function Timezone({
  timezone,
  countries,
  selectedCountry,
  onDropdownSelectHandler,
}) {
  const navigate = useNavigate();

  const [clockTime, setClockTime] = useState("00:00:00");
  
  const [isClockRunning, setIsClockRunning] = useState(true);
  const [pausedTime, setPausedTime] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [isTimeStopped, setIsTimeStopped] = useState(false);

  useEffect(() => {
    let interval;
    if (isClockRunning && !isTimeStopped) {
      console.log("tenta render 1");
      interval = setInterval(() => {
        const currentTimeInUserTimezone = moment()
          .tz(timezone)
          .format("HH:mm:ss");
        setClockTime(currentTimeInUserTimezone);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timezone, isClockRunning, isTimeStopped]);

  const toggleClock = () => {
    setIsTimeStopped(!isClockRunning);
    setIsClockRunning(!isClockRunning);
    if (!isClockRunning) {
      setPausedTime(clockTime);
    } else {
      const pausedDurationInSeconds = moment().diff(
        moment(pausedTime, "HH:mm:ss"),
        "seconds"
      );
      console.log("pausedDurationInSeconds", pausedDurationInSeconds);
      setPausedDuration(pausedDurationInSeconds);
    }
  };

  useEffect(() => {
    let interval;
    if (!isClockRunning && pausedTime !== null) {
      console.log("tenta render 2");
      interval = setInterval(() => {
        const resumedTime = moment()
          .subtract(pausedDuration, "seconds")
          .format("HH:mm:ss");
        setClockTime(resumedTime);
        console.log("resumedTime", resumedTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isClockRunning, pausedTime, pausedDuration]);

  const onBackButtonClickHandler = () => {
    navigate("/");
  };

  const onTimeZoneChanged = (e, value) => {
    onDropdownSelectHandler(e, value);
    setIsTimeStopped(false);
    setIsClockRunning(true);
    setPausedTime(null);
    // setClockTime("00:00:00");
  };

  return (
    <div className="TimeZone_container">
      <div className="left_action">
        <Button
          className="btn"
          color="primary"
          variant="contained"
          onClick={() => onBackButtonClickHandler()}
        >
          Back
        </Button>
      </div>
      <div className="right_action">
        <DropDown
          data={countries}
          onDropdownSelectHandler={(e, value) => onTimeZoneChanged(e, value)}
          selectedCountry={selectedCountry}
        />

        <Typography>{clockTime}</Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={toggleClock}
          className="btn"
        >
          {isTimeStopped ? "Start" : "Pause"}
        </Button>
      </div>
    </div>
  );
}

export default Timezone;
