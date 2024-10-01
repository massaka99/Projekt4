const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userName: { type: String, required: false, unique: false },
    weekNumber: { type: Number, required: true, unique: false },
    ownerId: { type: String, required: true, unique: false },
    exerciseName: String,
    sets: Number,
    reps: Number
  });

const Session = mongoose.model("Session", sessionSchema);

async function createSession(ownerId, weekNumber, exerciseName, sets, reps) {
    try {
      const session = new Session({ ownerId, weekNumber, exerciseName, sets, reps});
      await session.save();
      return session;
    } catch (error) {
      console.error("Error creating session:", error.message);
      if (error.name === "ValidationError" && error.errors.ownerId) {
        // Handle validation error for ownerId
        throw new Error("user not found");
      }
      else if (error.name === "ValidationError" && error.errors.weekNumber) {
        // Handle validation error for week number
        throw new Error("week number is required");
      }
      else if (error.name === "ValidationError" && error.errors.exerciseName) {
        // Handle validation error for exercise name
        throw new Error("Name of exercise not specified");
      }
      throw new Error("Error creating user");
    }
  }

  async function findSession(ownerId, weekNumber, exerciseName) {
    try {
      const session = await Session.findOne({ ownerId: ownerId, weekNumber: weekNumber, exerciseName: exerciseName }); 
      return session; 
    } catch (error) {
      console.error("Error finding session:", error.message);
      throw new Error("session not found");
    }
  }
  async function findSessionByUserId(userId) {
    try {
      const session = await Session.find({ ownerId: userId }); 
      return session; 
    } catch (error) {
      console.error("Error finding sessions by ID:", error.message);
      throw new Error("Session by ID not found");
    }
  }

module.exports = { Session, createSession, findSession, findSessionByUserId};