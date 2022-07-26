import "./App.css";
import SearchBar from "./components/search/SearchBar";
import AppartmentCard from "./components/appartment/AppartmentCard";
import appartments from "./stays.json";
import { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [guestValue, setGuestValue] = useState(0);
  const [numberOfAppartments, setNumberOfAppartments] = useState(
    appartments.length - 1
  );

  // here you get the text typed on location input and the amount of guests you want to filter on and assign them to states so we can pass these as props to the appartment card component
  const handleInputValue = (inputSearch, totalGuests) => {
    setSearchValue(inputSearch);
    setGuestValue(totalGuests);
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="logo-img">
            <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo" />
          </div>

          <div className="search-section">
            <SearchBar
              passInputValue={(inputValue, totalGuests) =>
                handleInputValue(inputValue, totalGuests)
              }
            />
          </div>
        </header>

        <main>
          <div className="appartments-section">
            <div className="stays-section">
              <h3>Stays in Finland</h3>
              <p className="number-of-stays">{numberOfAppartments}+ stays</p>
            </div>

            <div className="appartments">
              <AppartmentCard
                filterValue={searchValue}
                guests={guestValue}
                appartments={appartments}
                setNumberOfAppartments={setNumberOfAppartments}
              />
            </div>
          </div>
          <footer className="footer">
            <p>
              Created by{" "}
              <a
                href="https://github.com/ChristosDurro"
                target="_blank"
                rel="noopener noreferrer"
                className="username"
              >
                Christos Durro
              </a>{" "}
              -{" "}
              <a
                href="https://devchallenges.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="dev-link"
              >
                devChallenges.io
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
