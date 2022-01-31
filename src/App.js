import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import MultipleWinner from "./components/MultipleWinner";
import Winners from "./components/Winners";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("all-winners");
  const [mainList, setMainList] = useState([]);

  const getInitialData = async () => {
    const res = await fetch("http://api.nobelprize.org/v1/prize.json");
    const data = await res.json();

    setMainList(data.prizes);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const showDoubleWinners = () => {
    setCurrentScreen("double-winners");
  };

  const showSingleWinners = () => {
    setCurrentScreen("all-winners");
  };

  return currentScreen === "all-winners" ? (
    <Winners showDoubleWinners={showDoubleWinners} mainList={mainList} />
  ) : (
    <MultipleWinner showSingleWinners={showSingleWinners} mainList={mainList} />
  );
};

export default App;
