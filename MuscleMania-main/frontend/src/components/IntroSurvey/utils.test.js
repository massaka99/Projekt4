import { calculateBMI, calculateBMR, calculateDeficits } from "./utils";

describe("utils", () => {
  test("calculateBMI correctly calculates BMI", () => {
    const bmi = calculateBMI(70, 170);
    expect(bmi).toBe("24.22");
  });

  test("calculateBMR correctly calculates BMR for male", () => {
    const bmrMale = calculateBMR("male", 70, 170, 25);
    expect(bmrMale).toBe(1643); // Corrected expected value
  });

  test("calculateBMR correctly calculates BMR for female", () => {
    const bmrFemale = calculateBMR("female", 70, 170, 25);
    expect(bmrFemale).toBe(1477); // Corrected expected value
  });

  test("calculateDeficits correctly calculates calorie deficits", () => {
    const deficits = calculateDeficits(80, 70, 10);
    expect(deficits).toEqual({
      dailyCalorieDeficit: -1100,
      weeklyCalorieDeficit: -7700,
      goalDescription: "calorieMINUS",
    });
  });
});
