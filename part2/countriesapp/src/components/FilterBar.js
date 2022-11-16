import React from "react";

function FilterBar({ filterString, handleFilterStringChange }) {
  return (
    <div>
      <label htmlFor="search">Search : </label>
      <input
        type="text"
        name="search"
        value={filterString}
        onChange={handleFilterStringChange}
      />
    </div>
  );
}

export default FilterBar;
