interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  values: Array<string>;
  target: number;
}

const parseArguments = (args: Array<string>): ExerciseInput => {
  if (args.length < 3) {
    throw new Error("Invalid Input");
  } else {
    const inputs = args.slice(2,args.length);
    return {
      values: inputs.slice(0,inputs.length - 1),
      target: parseFloat(inputs[inputs.length - 1]),
    };
  }
};

const calculate = (inputs: Array<string>, target: number): ExerciseResult => {
  let successCount: number = 0;
  const messages: Array<string> = [
    "terrible",
    "not too bad but could be better",
    "close to good",
    "perfect",
  ];
  let messageIndex: number = 0;
  let sum: number = 0;
  for (const number of inputs) {
    if (parseFloat(number) > 0) {
      successCount++;
    }

    sum += parseFloat(number);
    console.log(sum);
  }

  if (successCount === inputs.length) {
    messageIndex = 3;
  } else if (successCount === inputs.length - 1) {
    messageIndex = 2;
  } else if (successCount >= inputs.length - 3) {
    messageIndex = 1;
  }

  if (inputs.length === 0) {
    throw new Error("Division by zero.");
  } else {
    return {
      periodLength: inputs.length,
      trainingDays: successCount,
      success: successCount === inputs.length,
      rating: inputs.length - successCount,
      ratingDescription: messages[messageIndex],
      target: target,
      average: sum / inputs.length,
    };
  }
};

try {
  const {values,target} = parseArguments(process.argv);
  console.log(values);
  console.log(calculate(values,target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
