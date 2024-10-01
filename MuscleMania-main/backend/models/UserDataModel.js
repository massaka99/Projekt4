const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Reuse salt for password hashing
const saltRounds = 10;

const Schema = mongoose.Schema;

const ResultsSchema = new mongoose.Schema({
  bmiCurrent: Number,
  bmrCurrent: Number,
  bmiAfter: Number,
  bmrAfter: Number,
  dailyCalorieDeficit: Number,
  weeklyCalorieDeficit: Number,
  goalDescription: String,
});

const PersonalWorkoutPlan = new mongoose.Schema({

difficulty: String,
duration: String,
focusArea: String,
id: Number,
score: Number,
title: String
});

const userSchema = new Schema({
  username: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hashedPassword: { type: String, required: true }, 
  surveyCompleted: { type: Boolean, default: false },
  name: String,
  age: Number,
  gender: String,
  height: Number,
  fitnessLevel: String,
  focusArea: String,
  desiredWeeklyWorkouts: String,
  weight: Number,
  wantedWeight: Number,
  weeksToGoal: Number,
  results: ResultsSchema,
  Plan: PersonalWorkoutPlan 
}, {
  timestamps: true, // UTC time
  versionKey: false
});


const User = mongoose.model("User", userSchema);

async function createUser(username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    const user = new User({ username, email, password, hashedPassword });
    await user.save();
    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    if (error.name === "ValidationError" && error.errors.username || !username) {
      // Handle validation error for username field
      throw new Error("Username is required");
    }
    throw new Error("Error creating user");
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email }); 
    return user; 
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    throw new Error("User by email not found");
  }
}

async function updateUser(email, newPassword, resetToken) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.error("User not found for email:", email);
      throw new Error("User not found");
    }

    // Update the user's password with the new plain password
    user.password = newPassword;
    user.resetToken = resetToken; 
    user.hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await user.save();
    console.log("User password updated successfully");
    return user;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error("Error updating user");
  }
}

async function generateResetToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 20;
  let resetToken = '';
  for (let i = 0; i < tokenLength; i++) {
    resetToken += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Set expiration date to 1 hour from now
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);

  return { resetToken, expirationDate };
}


module.exports = { User, createUser, findUserByEmail, updateUser, generateResetToken };

