import { useState } from "react";

import Button from "./Button";
import Header from './Header';
import Statistics from "./Statistics";

function App() {
  const [badReviewsCount, setBadReviewsCount] = useState(0);
  const [neutralReviewsCount, setNeutralReviewsCount] = useState(0);
  const [goodReviewsCount, setGoodReviewsCount] = useState(0);

  const incrementBadReviews = () =>{
    setBadReviewsCount(badReviewsCount+1);
  }

   const incrementAverageReviews = () => {
     setNeutralReviewsCount(neutralReviewsCount + 1);
   };

    const incrementGoodReviews = () => {
      setGoodReviewsCount(goodReviewsCount + 1);
    };
  return (
    <div className="App">
      <Header title="Give Feedback" />

      <Button label="Good" onClick={incrementGoodReviews} />
      <Button label="Average" onClick={incrementAverageReviews} />
      <Button label="Bad" onClick={incrementBadReviews} />

      <Statistics
        statistics={{
          goodCount: goodReviewsCount,
          badCount: badReviewsCount,
          neutralCount: neutralReviewsCount,
        }}
      />
    </div>
  );
}

export default App;
