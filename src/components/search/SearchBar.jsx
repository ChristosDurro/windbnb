import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClickedSearchBar from "../clickedSearchBar/ClickedSearchBar";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [showLocationTable, setShowLocationTable] = useState(false);
  const [showGuestTable, setShowGuestTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [totalGuests, setTotalGuests] = useState("");

  const handleClick = (e) => {
    const inputClicked = e.target.id;

    if (inputClicked === "location-input") {
      setShowLocationTable(true);
      setOpen(true);
      setClosed(false);
      setShowGuestTable(false);
    }
    if (inputClicked === "guest-input") {
      setOpen(true);
      setClosed(false);
      setShowGuestTable(true);
      setShowLocationTable(false);
    }
  };

  const handleCloseSearchBar = () => {
    setOpen(false);
    setClosed(true);
    setShowLocationTable(false);
    setShowGuestTable(false);
  };

  const handleInputChange = (firstInputValue, totalGuests) => {
    setInputValue(firstInputValue);
    setTotalGuests(totalGuests);
    setOpen(false);
    setClosed(true);
    setShowLocationTable(false);
    setShowGuestTable(false);
    props.passInputValue(firstInputValue, totalGuests);
  };

  return (
    <div className="search-bar-section">
      <div className="group-input">
        <input
          type="text"
          className="first-input"
          placeholder="Location"
          id="location-input"
          onClick={handleClick}
          defaultValue={inputValue}
        />
        <input
          type="text"
          className="second-input"
          placeholder="Add guests"
          id="guest-input"
          onClick={handleClick}
          defaultValue={totalGuests === "" ? "" : `${totalGuests} Guests`}
        />
        <button className="search-btn">
          <SearchIcon sx={{ color: "#EB5757E5" }} />
        </button>
      </div>
      <ClickedSearchBar
        displayLocationTable={showLocationTable}
        displayGuestTable={showGuestTable}
        showOpenSearchBar={open}
        closeOpenSearchBar={closed}
        handleCloseButton={() => handleCloseSearchBar()} // making close button click execute on parent components
        handleSearchButton={
          (firstInputValue, totalGuests) =>
            handleInputChange(firstInputValue, totalGuests) // passing location and guest input as props from child to parent component
        }
      />
    </div>
  );
};

export default SearchBar;
