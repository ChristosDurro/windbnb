import React, { useRef, useState } from "react";
import appartments from "../../stays.json";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "./ClickedSearchBar.css";
import { useEffect } from "react";

const ClickedSearchBar = (props) => {
  const cities = [];

  const [firstInputValue, setFirstInputValue] = useState("");
  const [showLocationTable, setShowLocationTable] = useState(false);
  const [showGuestTable, setShowGuestTable] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);

  // filter cities shown in location table so that there are no duplicate cities shown, only show one instance of each city
  const filteredData = appartments.filter((appartment) => {
    if (firstInputValue === "") return appartment;
    else
      return (
        appartment.city.toLowerCase().includes(firstInputValue) ||
        appartment.city.includes(firstInputValue) ||
        appartment.country.toLowerCase().includes(firstInputValue) ||
        appartment.country.includes(firstInputValue)
      );
  });

  // which table to show everytime an input is clicked when search bar isn't open
  useEffect(() => {
    setShowLocationTable(props.displayLocationTable);
    setShowGuestTable(props.displayGuestTable);
  }, [props.displayLocationTable, props.displayGuestTable]);

  // focus on input clicked
  if (showLocationTable) firstInputRef.current.focus();
  if (showGuestTable) secondInputRef.current.focus();

  const handleInputChange = (e) => {
    setFirstInputValue(e.target.value);
  };

  // open location table and close guest table when location input is clicked
  const handleFirstInputClick = () => {
    setShowLocationTable(true);
    setShowGuestTable(false);
  };

  // open guest table and close location table when guest input is clicked
  const handleSecondInputClick = () => {
    setShowLocationTable(false);
    setShowGuestTable(true);
  };

  // when a city is clicked from location table show it on the input field
  const handleLocationClick = (e) => {
    setFirstInputValue(e.target.innerHTML);
  };

  // guest table button actions
  const handleAdultsReduce = () => {
    if (adults < 1) return;
    else setAdults((previousValue) => previousValue - 1);
  };

  const handleAdultsAdd = () => {
    setAdults((previousValue) => previousValue + 1);
  };

  const handleChildrenReduce = () => {
    if (children < 1) return;
    else setChildren((previousValue) => previousValue - 1);
  };

  const handleChildrenAdd = () => {
    setChildren((previousValue) => previousValue + 1);
  };

  // making page not scroll when search bar is open
  if (props.showOpenSearchBar) {
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = "";

  return (
    <>
      {props.showOpenSearchBar ? (
        <div className="open-search-bar-section">
          <div className="header">
            <p className="edit">Edit your search</p>
            <button
              className="close-btn"
              onClick={() => props.handleCloseButton()}
            >
              <CloseIcon sx={{ color: "#333333" }} />
            </button>
          </div>
          <div className="group-input-open">
            <div className="group-1">
              <input
                type="text"
                className="first-input-open"
                id="first-input-open"
                placeholder="Location"
                onChange={handleInputChange}
                value={firstInputValue}
                onClick={handleFirstInputClick}
                ref={firstInputRef}
              />
              <label htmlFor="first-input-open" className="label">
                Location
              </label>
            </div>
            <div className="group-2">
              <input
                type="text"
                className="second-input-open"
                id="second-input-open"
                placeholder="Add guests"
                onClick={handleSecondInputClick}
                ref={secondInputRef}
                value={`${adults + children} Guests`}
                readOnly
              />
              <label htmlFor="second-input-open" className="label">
                Guests
              </label>
            </div>
            <div className="group-3">
              <button
                className="search-open"
                onClick={() =>
                  props.handleSearchButton(firstInputValue, adults + children)
                }
              >
                <SearchIcon />
                Search
              </button>
            </div>
          </div>
          <div className="table-area">
            {showLocationTable ? (
              <div className="table-1">
                <table className="countries-table">
                  <tbody>
                    {filteredData.map((appartment, index) => {
                      if (!cities.includes(appartment.city)) {
                        cities.push(appartment.city);

                        return (
                          <tr key={index}>
                            <td
                              className="table-data"
                              onClick={handleLocationClick}
                            >
                              <LocationOnIcon sx={{ color: "#4F4F4F" }} />
                              <span
                                className="td-text"
                                onClick={handleLocationClick}
                              >
                                {appartment.city}, {appartment.country}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
            {showGuestTable ? (
              <div className="table-2">
                <table className="guest-table">
                  <tbody>
                    <tr className="guest-row">
                      <th className="headers">
                        <span className="header1">Adults</span>
                        <span className="header2">Ages 13 or above</span>
                      </th>
                      <td className="guest-data">
                        <button
                          onClick={handleAdultsReduce}
                          className="guest-btn"
                        >
                          <RemoveIcon fontSize="sm" />
                        </button>
                        <span className="guest-span">{adults}</span>
                        <button onClick={handleAdultsAdd} className="guest-btn">
                          <AddIcon fontSize="sm" />
                        </button>
                      </td>
                    </tr>
                    <tr className="guest-row">
                      <th className="headers">
                        <span className="header1">Children</span>
                        <span className="header2">Ages 2-12</span>
                      </th>
                      <td className="guest-data">
                        <button
                          onClick={handleChildrenReduce}
                          className="guest-btn"
                        >
                          <RemoveIcon fontSize="sm" />
                        </button>
                        <span className="guest-span">{children}</span>
                        <button
                          onClick={handleChildrenAdd}
                          className="guest-btn"
                        >
                          <AddIcon fontSize="sm" />{" "}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ClickedSearchBar;
