interface BMIValues {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100 * height/100);
  console.log(bmi);

  if (bmi > 30.0 ) {
    return "Obese (over weight)";
  } else if (bmi < 29.9 && bmi > 25.0) {
    return "Overweight (above weight)";
  } else if (bmi < 24.9 && bmi > 18.5) {
    return "Normal (healthy weight)";
  } else {
    return "Malnutritioned (underweight)";
  }
};

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
