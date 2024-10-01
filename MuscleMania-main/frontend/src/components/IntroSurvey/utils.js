// utils.js
export function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return (weight / heightInMeters ** 2).toFixed(2);
}

export function calculateBMR(gender, weight, height, age) {
  return gender === "male"
    ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
    : Math.round(10 * weight + 6.25 * height - 5 * age - 161);
}

export function calculateDeficits(currentWeight, wantedWeight, weeksToGoal) {
  const weightLossPerWeek = (wantedWeight - currentWeight) / weeksToGoal;
  const calorieChangePerDay = Math.round((weightLossPerWeek * 7700) / 7);
  return {
    dailyCalorieDeficit: calorieChangePerDay,
    weeklyCalorieDeficit: calorieChangePerDay * 7,
    goalDescription: weightLossPerWeek >= 0 ? "caloriePLUS" : "calorieMINUS",
  };
}
