import React from "react";
import Result from "./Result";

function ResultDisplay({ dataToShow, filterString }) {
  // empty search
  if (filterString.length === 0) {
    return <p>Enter a search term</p>;
  }

  //   empty result
  else if (dataToShow.length === 0) {
    return <p>No Result</p>;
  }
  //   too many res
  else if (dataToShow.length > 10) {
    return <p>Narrow Down your search</p>;
  }

  //   s
  else {
    return (
      <>
        {dataToShow.map((country) => (
          <Result key={country.capital} country={country} />
        ))}
      </>
    );
  }
}

export default ResultDisplay;
