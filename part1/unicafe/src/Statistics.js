import React from 'react'
import StatisticsLine from './StatisticsLine';

function Statistics({ statistics }) {
 const {goodCount,neutralCount,badCount} = statistics;
  const countSum = goodCount + badCount + neutralCount;
 const average =( (goodCount * 1) + (badCount * -1))/countSum
 if(countSum > 0){
   return (
     <div>
       <h1>Statistics</h1>
       <table>
         <tbody>
           <StatisticsLine label="Good" value={goodCount} />

           <StatisticsLine label="Neutral" value={neutralCount} />
           <StatisticsLine label="Bad" value={badCount} />

         
           <StatisticsLine label="All" value={countSum} />
           <StatisticsLine label="Average" value={average} />
           <StatisticsLine
             label="Positive"
             value={(goodCount / countSum) * 100 + " %"}
           />
         </tbody>
       </table>
     </div>
   );
 }else{
  return <p>No Feedbacks given</p>
 }
}

export default Statistics