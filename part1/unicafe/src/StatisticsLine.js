import React from 'react'

function StatisticsLine({label,value}) {
  return (
    <tr>
      <td>{label}</td>
      <td> :</td>
      <td>{value}</td>
    </tr>
  );
}

export default StatisticsLine