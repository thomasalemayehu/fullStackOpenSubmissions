import React from 'react'

function Filter({filterString,onFilterStringChange}) {
  return (
    <div>
      <label htmlFor="">Filter : </label>

      <input type="text" value={filterString} onChange={onFilterStringChange} />
    </div>
  );
}

export default Filter