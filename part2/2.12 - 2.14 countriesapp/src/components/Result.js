import React from "react";
import ResultDetail from "./ResultDetail";
import { useState } from "react";

function Result({ country }) {
  const [showDetail, setShowDetail] = useState(false);

  const toggleShowStatus = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div>
      <br />
      <span>{country.name.official}</span>

      <span>{"  "}</span>

      <button onClick={toggleShowStatus}>
        {showDetail === true ? "Hide" : "Show"}
      </button>

      {showDetail === true ? <ResultDetail country={country} /> : <></>}
    </div>
  );
}

export default Result;
