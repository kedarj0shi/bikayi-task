import React, { useEffect, useState } from "react";
import "./winner.css";
import "./Dropdown.css";



const MultipleWinner = ({ showSingleWinners, mainList }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const tempList = [];
    const finalList = [];
    mainList.map((item) => {
      {
        item.laureates?.map((laureate) => {
          if (tempList.includes(laureate.id)) {
            const count = finalList.filter((item) => item.id === laureate.id);
            if (count.length === 0) {
              if (laureate.surname) {
                finalList.push(laureate);
              }
            }
          } else {
            tempList.push(laureate.id);
          }
        });
      }
    });

    setList(finalList);
  }, []);

  return (
    <div>
      <div onClick={showSingleWinners} className="dropdown options">
        Show all winners
      </div>
      <div>
        {list?.map((item) => (
          <div className="double-nobel-winner">
            <div className="lorate-card">
              <div className="details">
                <div className="laureate-name">
                  {item.firstname} {item.surname}
                </div>
                <div className="laureate-id">{item.id}</div>
              </div>
              <div className="laureate-motivation">
                {item.motivation.toUpperCase()}
              </div>
            </div>
            <div className="awards"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleWinner;
