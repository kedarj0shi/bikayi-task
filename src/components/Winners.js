import React, { useEffect, useState } from "react";
import "./winner.css";
import "./Dropdown.css";


const CATEGORIES = [
  "LITERATURE",
  "PHYSICS",
  "CHEMISTRY",
  "MEDICINE",
  "PEACE",
  "ECONOMICS",
];
const YEARS = [];

for (var i = 1900; i <= 2020; i++) {
  var year = i.toString();
  YEARS.push(year);
}


const Winners = ({ showDoubleWinners, mainList }) => {
  const [list, setList] = useState(mainList);
  const [showCat, setShowCat] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [category, setCategory] = useState("Filter by category");
  const [year, setYear] = useState("Filter by year");

  const filterByCat = (cat) => {
    if (year !== "Filter by year") {
      const temp = mainList.filter(
        (item) =>
          item.category.toLocaleLowerCase() === cat.toLocaleLowerCase() &&
          item.year === year
      );
      setCategory(cat);
      setList(temp);
    } else {
      const temp = mainList.filter(
        (item) => item.category.toLocaleLowerCase() === cat.toLocaleLowerCase()
      );
      setCategory(cat);
      setList(temp);
    }
  };

  useEffect(() => {
    setList(mainList);
  }, [mainList]);

  const filterByYear = (year) => {
    if (category !== "Filter by category") {
      const temp = mainList.filter(
        (item) =>
          item.year === year &&
          item.category.toLocaleLowerCase() === category.toLocaleLowerCase()
      );
      setYear(year);
      setList(temp);
    } else {
      const temp = mainList.filter(
        (item) => item.year.toUpperCase() === year.toUpperCase()
      );
      console.log(temp);
      setYear(year);
      setList(temp);
    }
  };

  const resetList = () => {
    setList(mainList);
    setCategory("Filter by catgeory");
    setYear("Filter by year");
  };

  const openCategories = () => {
    setShowCat(!showCat);
    setShowYears(false);
  };

  const openYears = () => {
    setShowYears(!showYears);
    setShowCat(false);
  };

  return (
    <div>
      <div className="header">
        <h1>Nobel Prize Winners</h1>
        <h3>BIKAYI</h3>
        <p>By - Kedar Joshi</p>
      </div>
      <div className="options">
        <div className="dropdown" onClick={openCategories}>
          <div className="dropdown-category">
            {category} <i className="fi fi-rr-angle-down"></i>
          </div>
          <div className={`container ${showCat ? "show-options" : ""}`}>
            {CATEGORIES.map((cat) => (
              <div onClick={() => filterByCat(cat)}>{cat}</div>
            ))}
          </div>
        </div>
        <div className="dropdown" onClick={openYears}>
          <div className="dropdown-category">
            {year} <i className="fi fi-rr-angle-down"></i>
          </div>
          <div className={`container ${showYears ? "show-options" : ""}`}>
            {YEARS.map((year) => (
              <div onClick={() => filterByYear(year)}>{year}</div>
            ))}
          </div>
        </div>
        <div onClick={resetList} className="dropdown">
          Reset Filters
        </div>
        <div onClick={showDoubleWinners} className="dropdown">
          Show double winners
        </div>
      </div>
      <div className="list-container">
        {list.map((item) =>
          item.laureates ? (
            <div
              className="winner-card fade-in"
              key={item.category + item.year}
            >
              <div className="card-top">
                <div>{item.year}</div>
                <div className="card-category">
                  {item.category}
                </div>
              </div>
              <div className="laureate">
                {item.laureates?.map((item) => {
                  return (
                    <div className="laureate-card">
                      <div className="details">
                        <div className="laureate-name">
                          {item.firstname} {item.surname}
                        </div>
                        <div className="laureate-id">{item.id}</div>
                      </div>
                      <div className="laureate-motivation">
                      <i class="fi fi-ss-bulb"></i>{item.motivation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Winners;
