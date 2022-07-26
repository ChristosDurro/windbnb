import React from "react";
import "./AppartmentCard.css";
import GradeIcon from "@mui/icons-material/Grade";
import { useEffect } from "react";

const AppartmentCard = ({ setNumberOfAppartments, ...props }) => {
  /* saving location input value to searchText variable in an array to separate possible multiple values passed. 
  for example input("Helsinki, Finland") => searchText = ['Helsinki', 'Finland'] */
  const searchText =
    props.filterValue.split(",").length > 1
      ? props.filterValue.split(",")
      : props.filterValue.split(" ");

  // filtering appartments based on input and number of guests
  const filterAppartments = props.appartments.filter((appartment) => {
    if (props.filterValue === "" && props.guests === 0) return appartment;
    else if (props.filterValue === "" && props.guests > 0) {
      return appartment.maxGuests >= props.guests;
    } else if (searchText.length < 2) {
      return (
        (appartment.city.includes(searchText[0]) ||
          appartment.city.toLowerCase().includes(searchText[0]) ||
          appartment.country.includes(searchText[0]) ||
          appartment.country.toLowerCase().includes(searchText[0])) &&
        appartment.maxGuests >= props.guests
      );
    } else {
      return (
        (appartment.city.includes(searchText[0]) ||
          appartment.country.includes(searchText[1])) &&
        appartment.maxGuests >= props.guests
      );
    }
  });

  // change number of appartments showing on page whenever the searchText, filterAppartments.length and setNumberOfAppartments change
  useEffect(() => {
    setNumberOfAppartments(filterAppartments.length - 1);
  }, [searchText, filterAppartments.length, setNumberOfAppartments]);

  return (
    <>
      {filterAppartments.length > 0 ? (
        filterAppartments.map((appartment, index) => {
          return (
            <div key={index} className="card">
              <img src={appartment.photo} alt={appartment.title} />
              <div className="details">
                <div className="detail-section-1">
                  {appartment.superHost ? (
                    <p className="superhost">Superhost</p>
                  ) : null}
                  <p className="description">
                    <span className="type">{appartment.type}. </span>
                    <span className="beds">{appartment.beds} beds</span>
                  </p>
                  <p className="rating">
                    <GradeIcon sx={{ color: "#EB5757B8" }} />
                    <span>{appartment.rating}</span>
                  </p>
                </div>
                <p className="title">{appartment.title}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="not-found">No Appartments Found</p>
      )}
    </>
  );
};

export default AppartmentCard;
