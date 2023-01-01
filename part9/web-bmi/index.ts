import express from "express";
import { calculateBmi, BMIResponse } from "./bmiCalculator";
const app = express();

app.get("/hello", (_, resp) => {
  resp.send("Hello Full Stack");
});

app.get("/bmi", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { height, weight } = request.query;

  if (!height || !weight) {
    response.status(400).json({ error: "malformatted parameters" });
    return;
  }

  try {
    const responseInfo: BMIResponse = calculateBmi(
      parseFloat(height.toString()),
      parseFloat(weight.toString())
    );
    response.json(responseInfo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).json({ error: error.message });
      return;
    }

    response.status(400).json({ error: "Something went wrong" });
    return;
  }
});

app.listen(3000, () => {
  console.log("Server is live");
});
