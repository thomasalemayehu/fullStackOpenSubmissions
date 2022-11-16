import axios from "axios";
import { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [allData, setAllData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);

  const [filterString, setFilterString] = useState("");

  const getAllData = async () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllData(response.data);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  // event handlers
  const onFilterStringChange = (event) => {
    setFilterString(event.target.value);

    if (event.target.value.length > 0) {
      setDataToShow(
        allData.filter((country) =>
          country.name.official
            .trim()
            .toUpperCase()
            .includes(filterString.toUpperCase())
        )
      );
    } else {
      setDataToShow(allData);
    }
  };

  return (
    <div className="App">
      <h1>Country App</h1>

      <hr />

      <FilterBar
        filterString={filterString}
        handleFilterStringChange={onFilterStringChange}
      />

      <br />

      <hr />

      <ResultDisplay filterString={filterString} dataToShow={dataToShow} />
    </div>
  );
}

export default App;
