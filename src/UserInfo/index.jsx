import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/userActions";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

// api: https://dummy.restapiexample.com/api/v1/employees

function index() {
  const dispatch = useDispatch();

  const filterMenuItemData = ["below 25", "25-40", "Above 40"];

  const filterMenuSalary = [
    { id: 1, title: "Below 1,50,000" },
    { id: 1, title: "1,50,000 to 3,00,000" },
    { id: 1, title: "3,00,000 and above" },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState([]);

  const { userInfo } = useSelector((state) => state.user) || [];

  const [filteredData, setFilteredData] = useState([]);

  const onDropdownHandleChange = (e, filterType) => {
    const {
      target: { value },
    } = e;
    setSelectedMenuItem(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (userInfo) {
      setFilteredData(userInfo);
    }
  }, [userInfo]);

  // employee_age

  useEffect(() => {
    if (selectedMenuItem.length) {
      const filteredDataByAge = userInfo.filter((item) => {
        const age = parseInt(item.employee_age);

        if (selectedMenuItem.includes("below 25")) {
          if (age < 25) {
            return true;
          }
        }
        if (selectedMenuItem.includes("25-40")) {
          if (age >= 25 && age <= 40) {
            return true;
          }
        }
        if (selectedMenuItem.includes("Above 40")) {
          if (age > 40) {
            return true;
          }
        }
        return false;
      });
      setFilteredData(filteredDataByAge);
    } else {
      setFilteredData(userInfo);
    }
  }, [selectedMenuItem]);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <div>
      <div className="dropdown_container">
        <MultiSelectDropdown
          data={filterMenuItemData}
          selectedMenuItem={selectedMenuItem}
          onHandleChange={(e) => onDropdownHandleChange(e, "age_filter")}
        />
      </div>
      {filteredData?.map((item, index) => {
        return <h1 key={index}>{item.employee_name}</h1>;
      })}
    </div>
  );
}

export default index;
