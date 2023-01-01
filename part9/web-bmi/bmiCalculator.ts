interface BMIResponse {
  height: number;
  weight: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): BMIResponse => {
  const bmi = weight / (height/100 * height/100);
   let message: string = "";

  if (bmi > 30.0) {
    message = "Obese (over weight)";
  } else if (bmi < 29.9 && bmi > 25.0) {
    message = "Overweight (above weight)";
  } else if (bmi < 24.9 && bmi > 18.5) {
    message = "Normal (healthy weight)";
  } else {
    message = "Malnutritioned (underweight)";
  }

  return {
    height: height,
    weight,
    bmi: message,
  };
};


export {BMIResponse,calculateBmi};