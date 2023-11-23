/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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

  useEffect(() => {
    let interval;
    if (isClockRunning) {
      interval = setInterval(() => {
        const currentTimeInUserTimezone = moment()
          .tz(timezone)
          .format("HH:mm:ss");
        setClockTime(currentTimeInUserTimezone);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timezone, isClockRunning]);

  const toggleClock = () => {
    if (!isClockRunning) {
      setPausedTime(clockTime);
    } else {
      const pausedDurationInSeconds = moment().diff(
        moment(pausedTime, "HH:mm:ss"),
        "seconds"
      );
      setPausedDuration(pausedDurationInSeconds);
    }
    setIsClockRunning(!isClockRunning);
  };

  useEffect(() => {
    let interval;
    if (!isClockRunning && pausedTime !== null) {
      interval = setInterval(() => {
        const resumedTime = moment()
          .tz(timezone)
          .subtract(pausedDuration, "seconds")
          .format("HH:mm:ss");
        setClockTime(resumedTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timezone, isClockRunning, pausedTime, pausedDuration]);

  const onBackButtonClickHandler = () => {
    navigate("/");
  };

  const onTimeZoneChanged = (e, value) => {
    setClockTime("00:00:00"); // Reset clock time when timezone changes
    setIsClockRunning(true); // Start the clock when timezone changes
    setPausedTime(null); // Reset paused time
    setPausedDuration(0); // Reset paused duration
    onDropdownSelectHandler(e, value);
  };

  return (
    <div className="TimeZone_container">
      <div className="left_action">
        <Button
          className="btn"
          color="primary"
          variant="contained"
          onClick={onBackButtonClickHandler}
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
          {isClockRunning ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
}

export default Timezone;
