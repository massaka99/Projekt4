import React, { useState, useEffect } from "react";
import WorkoutModal from "../WorkoutModal/WorkoutModal";
import VideoModal from "../VideoModal/VideoModal";
import "./WorkoutGrid.css";
import { getUserData } from '../../API/api';  
import toast from 'react-hot-toast';


const videos = [
    { id: "gRVjAtPip0Y", description: "Bench Press" },
    { id: "Dy28eq2PjcM", description: "Squat" },
    { id: "sNPIHaaLXfM", description: "Bent Over Row" },
    { id: "_RlRDWO2jfg", description: "Barbell Shoulder Press" },
    { id: "IODxDxX7oi4", description: "Push Ups" },
    { id: "U4L_6JEv9Jg", description: "Leg Raises" },
    { id: "ykJmrZ5v0Oo", description: "Bicep Curl" },
    { id: "eGo4IYlbE5g", description: "Pull Ups" },
    { id: "XxWcirHIwVo", description: "Deadlift" },
    { id: "3XDriUn0udo", description: "Lunges" },
    { id: "BQu26ABuVS0", description: "Plank" },
    { id: "dL9ZzqtQI5c", description: "Side Bends" },
    { id: "l41SoWZiowI", description: "Dips" },
    { id: "Tau0hsW8iR0", description: "Russian Twists" },
    { id: "7pyxT5hqmQY", description: "Front Squats" },
    { id: "SrqOu55lrYU", description: "Incline Bench Press" },
    { id: "FWJR5Ve8bnQ", description: "Barbell Row" },
    { id: "Tux8PGVa9wQ", description: "Arnold Press" },
    { id: "zC3nLlEvin4", description: "Hammer Curls" },
    { id: "jDwoBqPH0jk", description: "Sit Ups" },
    { id: "DqkYuWR4zRI", description: "Kettlebell Swing" },
    { id: "r4MzxtBKyNE", description: "Sumo Deadlift" },
    { id: "9ZknEYboBOQ", description: "Step Ups" },
    { id: "2yjwXTZQDDI", description: "Military Press" },
    { id: "3VcKaXpzqRo", description: "Lateral Raise" },
    { id: "dhRz1Ns60Zg", description: "Calf Raises" },
    { id: "HzIiNhHhhtA", description: "Seated Dumbell Press" },
    { id: "kqidUIf1eJE", description: "Triceps Overhead Extension" },
    { id: "vngli9UR6Hw", description: "Preacher Curls" },
    { id: "W1SD96lrudY", description: "Leg Press" },
    { id: "yPis7nlbqdY", description: "T-bar Row" },
    { id: "roCP6wCXPqo", description: "One Arm Dumbell Row" },
    { id: "jaAV-rD45I0", description: "Upright Row" },
    { id: "d_KZxkY_0cM", description: "Skull Crushers" },
    { id: "RuIdJSVTKO4", description: "Hanging Leg Raises" },
    { id: "0AUGkch3tzc", description: "Concentration Curls" },
    { id: "9W5KAqHfDe8", description: "Goblet Squat" },
    { id: "CsROhQ1onAg", description: "Seated Cable Row" },
    { id: "1we3bh9uhqY", description: "Bicycle Crunches" },
    { id: "Ry-wqegeKlE", description: "Reverse Lunges " },
    { id: "zLyUAo1gMw" , description: "Triceps Pushdown" },
    { id: "ttvfGg9d76c", description: "Bent-over Dumbbell Reverse Fly" },
    { id: "NXr4Fw8q60o", description: "Side Plank" },
    { id: "V8dZ3pyiCBo", description: "Face Pulls" },
    { id: "ph3pddpKzzw", description: "Hyperextentions" },
    { id: "kwG2ipFRgfo", description: "Barbell Curls" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
    { id: "SALxEARiMkw", description: "Lat Pulldown" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
    { id: "hChjZQhX1Ls", description: "Incline Dumbell Press" },
];

const initialWorkoutPlans = [
  {
    id: 1,
    title: "Newbie Chill",
    difficulty: "Beginner",
    duration: "Low",
    focusArea: "Mixed",
    week: {
      Monday: [
        { name: "Bench Press", sets: 3, reps: 12 },
        { name: "Squat", sets: 3, reps: 10 },
        { name: "Bent-over Row", sets: 3, reps: 10 },
        { name: "Shoulder Press", sets: 3, reps: 12 },
        { name: "Push Ups", sets: 3, reps: 15 },
        { name: "Leg Raises", sets: 3, reps: 15 },
        { name: "Bicep Curls", sets: 3, reps: 12 }
      ],
      Tuesday: [
        { name: "Pull ups", sets: 3, reps: 8 },
        { name: "DeadLift", sets: 3, reps: 10 },
        { name: "Lunges", sets: 3, reps: 12 },
        { name: "Plank", sets: 3, reps: "30 seconds" },
        { name: "Side Bends", sets: 3, reps: 15 },
        { name: "Dips", sets: 3, reps: 12 },
        { name: "Russian Twists", sets: 3, reps: 15 }
      ],
      Wednesday: [
        { name: "Front Squat", sets: 3, reps: 10 },
        { name: "Incline Bench Press", sets: 3, reps: 12 },
        { name: "Barbell Row", sets: 3, reps: 10 },
        { name: "Arnold Press", sets: 3, reps: 12 },
        { name: "Dips", sets: 3, reps: 12 },
        { name: "Hammer Curl", sets: 3, reps: 12 },
        { name: "Sit Ups", sets: 3, reps: 15 }
      ],
      Thursday: [
        { name: "Kettlebell Swing", sets: 3, reps: 15 },
        { name: "Sumo Deadlift", sets: 3, reps: 10 },
        { name: "Step-ups", sets: 3, reps: 12 },
        { name: "Military Press", sets: 3, reps: 12 },
        { name: "Lateral Raise", sets: 3, reps: 15 },
        { name: "Calf Raises", sets: 3, reps: 15 },
        { name: "Forearm Curls", sets: 3, reps: 15 }
      ],
      Friday: [
        { name: "Deadlift", sets: 3, reps: 10 },
        { name: "Push-ups", sets: 3, reps: 15 },
        { name: "T-bar Row", sets: 3, reps: 10 },
        { name: "Seated Dumbbell Press", sets: 3, reps: 12 },
        { name: "Triceps Overhead Extension", sets: 3, reps: 12 },
        { name: "Leg Raises", sets: 3, reps: 15 },
        { name: "Preacher Curls", sets: 3, reps: 12 }
      ],
      Saturday: [
        { name: "Leg Press", sets: 3, reps: 12 },
        { name: "Bench Press", sets: 3, reps: 10 },
        { name: "One Arm Dumbbell Row", sets: 3, reps: 12 },
        { name: "Upright Row", sets: 3, reps: 12 },
        { name: "Skull Crushers", sets: 3, reps: 12 },
        { name: "Hanging Leg Raises", sets: 3, reps: 15 },
        { name: "Concentration Curls", sets: 3, reps: 12 }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 2,
    title: "First Time",
    difficulty: "Beginner",
    duration: "Medium",
    focusArea: "Mixed",
    week: {
      Monday: [
        { name: "Goblet Squat", sets: 3, reps: 12 },
        { name: "Push ups", sets: 3, reps: 15 },
        { name: "Seated Cable Row", sets: 3, reps: 12 },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
        { name: "Plank", sets: 3, reps: "45 seconds" },
        { name: "Bicycle Crunches", sets: 3, reps: 15 },
        { name: "Reverse Lunges", sets: 3, reps: 12 }
      ],
      Tuesday: [
        { name: "Deadlift", sets: 3, reps: 10 },
        { name: "Bench Press", sets: 3, reps: 12 },
        { name: "Bent-over Dumbbell Reverse Fly", sets: 3, reps: 12 },
        { name: "Side Plank", sets: 3, reps: "30 seconds per side" },
        { name: "Leg Curls", sets: 3, reps: 12 },
        { name: "Triceps Pushdown", sets: 3, reps: 12 },
        { name: "Calf Raises", sets: 3, reps: 15 }
      ],
      Wednesday: [
        { name: "Leg Press", sets: 3, reps: 10 },
        { name: "Pull ups", sets: 3, reps: 8 },
        { name: "Face Pulls", sets: 3, reps: 12 },
        { name: "Arnold Press", sets: 3, reps: 12 },
        { name: "Russian Twist", sets: 3, reps: 15 },
        { name: "Hyperextensions", sets: 3, reps: 12 },
        { name: "Barbell Curls", sets: 3, reps: 12 }
      ],
      Thursday: [
        { name: "Squat", sets: 3, reps: 10 },
        { name: "Incline Dumbbell Press", sets: 3, reps: 12 },
        { name: "Lat Pulldown", sets: 3, reps: 12 },
        { name: "Lateral Raise", sets: 3, reps: 15 },
        { name: "Glute Bridges", sets: 3, reps: 15 },
        { name: "Hammer Curls", sets: 3, reps: 12 }
      ],
      Friday: [
        { name: "Front Squat", sets: 3, reps: 10 },
        { name: "Push-ups with Rotation", sets: 3, reps: 12 },
        { name: "Single-arm Dumbbell Row", sets: 3, reps: 12 },
        { name: "Seated Arnold Press", sets: 3, reps: 12 },
        { name: "Hanging Leg Raises", sets: 3, reps: 15 },
        { name: "Dips", sets: 3, reps: 12 },
        { name: "Shrugs", sets: 3, reps: 15 }
      ],
      Saturday: [
        { name: "Romanian Deadlift", sets: 3, reps: 10 },
        { name: "Pec Deck Fly", sets: 3, reps: 12 },
        { name: "One-arm Cable Lateral Raise", sets: 3, reps: 12 },
        { name: "Cable Crunch", sets: 3, reps: 15 },
        { name: "Standing Calf Raise", sets: 3, reps: 15 },
        { name: "EZ Bar Preacher Curl", sets: 3, reps: 12 },
        { name: "Seated Calf Raise", sets: 3, reps: 15 }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 3,
    title: "Newbie Beast Mode",
    difficulty: "Beginner",
    duration: "High",
    focusArea: "Strength",
    week: {
      Monday: [
        { name: "Squat", sets: 4, reps: 12 },
        { name: "Bench Press", sets: 4, reps: 10 },
        { name: "Barbell Row", sets: 4, reps: 10 },
        { name: "Leg Press", sets: 4, reps: 12 },
        { name: "Dumbbell Shoulder Press", sets: 4, reps: 12 },
        { name: "Triceps Dips", sets: 4, reps: 12 },
        { name: "Bicep Curls", sets: 4, reps: 12 }
      ],
      Tuesday: [
        { name: "Deadlift", sets: 4, reps: 10 },
        { name: "Pull-ups", sets: 4, reps: 8 },
        { name: "Dumbbell Lunges", sets: 4, reps: 12 },
        { name: "Seated Cable Row", sets: 4, reps: 12 },
        { name: "Lateral Raises", sets: 4, reps: 15 },
        { name: "Plank", sets: 4, reps: "60 seconds" },
        { name: "Hammer Curls", sets: 4, reps: 12 }
      ],
      Wednesday: [
        { name: "Front Squat", sets: 4, reps: 10 },
        { name: "Incline Bench Press", sets: 4, reps: 10 },
        { name: "T-bar Row", sets: 4, reps: 12 },
        { name: "Leg Curls", sets: 4, reps: 12 },
        { name: "Arnold Press", sets: 4, reps: 12 },
        { name: "Tricep Extension", sets: 4, reps: 12 },
        { name: "Preacher Curl", sets: 4, reps: 12 }
      ],
      Thursday: [
        { name: "Leg Extensions", sets: 4, reps: 12 },
        { name: "Flat Dumbbell Press", sets: 4, reps: 12 },
        { name: "Wide Grip Lat Pulldown", sets: 4, reps: 12 },
        { name: "Bulgarian Split Squat", sets: 4, reps: 12 },
        { name: "Seated Dumbbell Press", sets: 4, reps: 12 },
        { name: "Skull Crushers", sets: 4, reps: 12 },
        { name: "Concentration Curls", sets: 4, reps: 12 }
      ],
      Friday: [
        { name: "Romanian Deadlift", sets: 4, reps: 10 },
        { name: "Pec Deck Fly", sets: 4, reps: 12 },
        { name: "Single Arm Dumbbell Row", sets: 4, reps: 12 },
        { name: "Step-ups", sets: 4, reps: 12 },
        { name: "Military Press", sets: 4, reps: 12 },
        { name: "Dips", sets: 4, reps: 12 },
        { name: "Wrist Curls", sets: 4, reps: 15 }
      ],
      Saturday: [
        { name: "Compound Exercises Review", description: "Light exercises and review of form and technique for all compound movements" }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 4,
    title: "HIIT Workout",
    difficulty: "Intermediate",
    duration: "Very High",
    focusArea: "Cardio",
    week: {
      Monday: [
        { name: "Burpees", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Mountain Climbers", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Jump Squats", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "High Knees", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Push-ups", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Jumping Jacks", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Sprints", sets: 4, reps: "20 seconds work, 10 seconds rest" }
      ],
      Tuesday: [
        { name: "Kettlebell Swings", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Medicine Ball Slams", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Box Jumps", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Battle Ropes", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Plank Jacks", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Speed Skaters", sets: 4, reps: "20 seconds work, 10 seconds rest" },
        { name: "Sprint Intervals", sets: 4, reps: "20 seconds work, 10 seconds rest" }
      ],
      Wednesday: [
        { name: "Tabata Mix", description: "Perform each exercise for 20 seconds, rest 10 seconds and rotate through: Burpees, Sit-ups, Lunges, Tuck Jumps" },
      ],
      Thursday: [
        { name: "Rowing Machine", sets: 4, reps: "1 minute work, 30 seconds rest" },
        { name: "Cycling Sprints", sets: 4, reps: "1 minute work, 30 seconds rest" },
        { name: "Jump Rope", sets: 4, reps: "1 minute work, 30 seconds rest" },
        { name: "Treadmill Sprints", sets: 4, reps: "1 minute work, 30 seconds rest" },
        { name: "Stair Climbing", sets: 4, reps: "1 minute work, 30 seconds rest" },
        { name: "Elliptical Machine", sets: 4, reps: "1 minute work, 30 seconds rest" },
        { name: "Speed Agility Ladder", sets: 4, reps: "1 minute work, 30 seconds rest" }
      ],
      Friday: [
        { name: "Circuit Training", description: "Complete three rounds of the following circuit: 10 burpees, 15 kettlebell swings, 20 mountain climbers, 25 squat jumps" }
      ],
      Saturday: [
        { name: "Outdoor Run", sets: 1, reps: "5k run at a steady pace" }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 5,
    title: "Complex Strength",
    difficulty: "Intermediate",
    duration: "Very High",
    focusArea: "Strength",
    week: {
      Monday: [
        { name: "Barbell Squats", sets: 5, reps: 8 },
        { name: "Bench Press", sets: 5, reps: 8 },
        { name: "Deadlifts", sets: 5, reps: 8 },
        { name: "Pull-ups", sets: 5, reps: 8 },
        { name: "Military Press", sets: 5, reps: 8 },
        { name: "Barbell Rows", sets: 5, reps: 8 },
        { name: "Barbell Curls", sets: 5, reps: 8 }
      ],
      Tuesday: [
        { name: "Dumbbell Lunges", sets: 5, reps: 10 },
        { name: "Incline Dumbbell Press", sets: 5, reps: 8 },
        { name: "Romanian Deadlift", sets: 5, reps: 8 },
        { name: "Wide-grip Lat Pulldown", sets: 5, reps: 8 },
        { name: "Arnold Press", sets: 5, reps: 8 },
        { name: "Dumbbell Rows", sets: 5, reps: 8 },
        { name: "Hammer Curls", sets: 5, reps: 8 }
      ],
      Wednesday: [
        { name: "Front Squats", sets: 5, reps: 8 },
        { name: "Dips", sets: 5, reps: 8 },
        { name: "Sumo Deadlift", sets: 5, reps: 8 },
        { name: "Chin-ups", sets: 5, reps: 8 },
        { name: "Seated Dumbbell Press", sets: 5, reps: 8 },
        { name: "T-bar Rows", sets: 5, reps: 8 },
        { name: "Preacher Curls", sets: 5, reps: 8 }
      ],
      Thursday: [
        { name: "Hack Squats", sets: 5, reps: 8 },
        { name: "Decline Bench Press", sets: 5, reps: 8 },
        { name: "Hex Bar Deadlift", sets: 5, reps: 8 },
        { name: "Ring Pull-ups", sets: 5, reps: 8 },
        { name: "Push Press", sets: 5, reps: 8 },
        { name: "Cable Rows", sets: 5, reps: 8 },
        { name: "Cable Curls", sets: 5, reps: 8 }
      ],
      Friday: [
        { name: "Leg Press", sets: 5, reps: 8 },
        { name: "Chest Flys", sets: 5, reps: 8 },
        { name: "Stiff Leg Deadlift", sets: 5, reps: 8 },
        { name: "Weighted Pull-ups", sets: 5, reps: 8 },
        { name: "Lateral Raises", sets: 5, reps: 12 },
        { name: "Pendlay Rows", sets: 5, reps: 8 },
        { name: "Concentration Curls", sets: 5, reps: 8 }
      ],
      Saturday: [
        { name: "Review and Recovery", description: "Review technique and focus on stretching and mobility work" }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 6,
    title: "Medium Strength",
    difficulty: "Intermediate",
    duration: "High",
    focusArea: "Strength",
    week: {
      Monday: [
        { name: "Barbell Squats", sets: 4, reps: 10 },
        { name: "Incline Bench Press", sets: 4, reps: 10 },
        { name: "Barbell Rows", sets: 4, reps: 10 },
        { name: "Dumbbell Shoulder Press", sets: 4, reps: 12 },
        { name: "Tricep Dips", sets: 4, reps: 12 },
        { name: "Barbell Curls", sets: 4, reps: 10 }
      ],
      Tuesday: [
        { name: "Deadlift", sets: 4, reps: 10 },
        { name: "Pull-ups", sets: 4, reps: 10 },
        { name: "Dumbbell Lunges", sets: 4, reps: 12 },
        { name: "Seated Cable Row", sets: 4, reps: 12 },
        { name: "Lateral Raises", sets: 4, reps: 15 },
        { name: "Hanging Leg Raises", sets: 4, reps: 15 }
      ],
      Wednesday: [
        { name: "Leg Press", sets: 4, reps: 12 },
        { name: "Decline Bench Press", sets: 4, reps: 10 },
        { name: "T-bar Row", sets: 4, reps: 12 },
        { name: "Arnold Press", sets: 4, reps: 12 },
        { name: "Skull Crushers", sets: 4, reps: 12 },
        { name: "Hammer Curls", sets: 4, reps: 12 }
      ],
      Thursday: [
        { name: "Front Squats", sets: 4, reps: 10 },
        { name: "Flat Dumbbell Press", sets: 4, reps: 12 },
        { name: "Wide Grip Lat Pulldown", sets: 4, reps: 12 },
        { name: "Upright Row", sets: 4, reps: 12 },
        { name: "Dumbbell Tricep Extension", sets: 4, reps: 12 },
        { name: "Preacher Curls", sets: 4, reps: 12 }
      ],
      Friday: [
        { name: "Hex Bar Deadlift", sets: 4, reps: 10 },
        { name: "Chest Dips", sets: 4, reps: 12 },
        { name: "One Arm Dumbbell Row", sets: 4, reps: 12 },
        { name: "Seated Military Press", sets: 4, reps: 12 },
        { name: "Overhead Tricep Extension", sets: 4, reps: 12 },
        { name: "Cable Curls", sets: 4, reps: 12 }
      ],
      Saturday: [
        { name: "Light Mixed Cardio", description: "20 minutes of light cardio to improve recovery and flexibility" }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 7,
    title: "Hypertrophy Master",
    difficulty: "Advanced",
    duration: "Very High",
    focusArea: "Strength",
    week: {
      Monday: [
        { name: "Barbell Bench Press", sets: 5, reps: 8 },
        { name: "Incline Dumbbell Press", sets: 5, reps: 10 },
        { name: "Cable Flys", sets: 5, reps: 12 },
        { name: "Push-ups", sets: 5, reps: 15 },
        { name: "Tricep Dips", sets: 5, reps: 15 },
        { name: "Overhead Cable Extension", sets: 5, reps: 12 }
      ],
      Tuesday: [
        { name: "Pull-ups", sets: 5, reps: 8 },
        { name: "Barbell Rows", sets: 5, reps: 8 },
        { name: "Lat Pulldown", sets: 5, reps: 10 },
        { name: "Seated Cable Row", sets: 5, reps: 12 },
        { name: "Barbell Curls", sets: 5, reps: 10 },
        { name: "Hammer Curls", sets: 5, reps: 12 }
      ],
      Wednesday: [
        { name: "Squats", sets: 5, reps: 8 },
        { name: "Leg Press", sets: 5, reps: 10 },
        { name: "Lunges", sets: 5, reps: 12 },
        { name: "Leg Curls", sets: 5, reps: 12 },
        { name: "Calf Raises", sets: 5, reps: 15 }
      ],
      Thursday: [
        { name: "Military Press", sets: 5, reps: 8 },
        { name: "Arnold Press", sets: 5, reps: 10 },
        { name: "Lateral Raises", sets: 5, reps: 12 },
        { name: "Front Raises", sets: 5, reps: 12 },
        { name: "Shrugs", sets: 5, reps: 15 }
      ],
      Friday: [
        { name: "Deadlift", sets: 5, reps: 8 },
        { name: "T-bar Row", sets: 5, reps: 8 },
        { name: "Hyperextensions", sets: 5, reps: 15 },
        { name: "Wide Grip Pull-ups", sets: 5, reps: 10 },
        { name: "EZ Bar Preacher Curls", sets: 5, reps: 12 }
      ],
      Saturday: [
        { name: "Full Body Compound Review", description: "Focus on form and technique across all major compound movements" }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 8,
    title: "Beast Powerlifter",
    difficulty: "Advanced",
    duration: "Extreme",
    focusArea: "Strength",
    week: {
      Monday: [
        { name: "Squats", sets: 5, reps: 5, description: "Heavy squats focusing on max strength" },
        { name: "Leg Press", sets: 4, reps: 10, description: "Supplemental quad work" },
        { name: "Calf Raises", sets: 4, reps: 12, description: "For lower leg strength" },
        { name: "Front Squats", sets: 4, reps: 5, description: "To develop quad strength and clean positioning" },
        { name: "Romanian Deadlift", sets: 4, reps: 10, description: "Hamstring and glute emphasis" }
      ],
      Tuesday: [
        { name: "Bench Press", sets: 5, reps: 5, description: "Heavy bench press for chest strength" },
        { name: "Incline Dumbbell Press", sets: 4, reps: 10, description: "Upper chest emphasis" },
        { name: "Triceps Dips", sets: 4, reps: 12, description: "Triceps strength to support bench press" },
        { name: "Cable Flys", sets: 4, reps: 12, description: "Isolation for the chest" },
        { name: "Overhead Tricep Extension", sets: 4, reps: 12, description: "Strengthening the triceps" }
      ],
      Wednesday: [
        { name: "Deadlifts", sets: 5, reps: 5, description: "Heavy deadlifts focusing on pulling strength" },
        { name: "Barbell Rows", sets: 4, reps: 10, description: "Upper back strengthening" },
        { name: "Hyperextensions", sets: 4, reps: 15, description: "Lower back and core strengthening" },
        { name: "Lat Pulldowns", sets: 4, reps: 12, description: "Upper body pull strength" },
        { name: "T-bar Row", sets: 4, reps: 10, description: "Middle back strength" }
      ],
      Thursday: [
        { name: "Overhead Press", sets: 5, reps: 5, description: "Building shoulder strength" },
        { name: "Lateral Raises", sets: 4, reps: 12, description: "Shoulder accessory work" },
        { name: "Shrugs", sets: 4, reps: 15, description: "For trap development" },
        { name: "Arnold Press", sets: 4, reps: 12, description: "Overall shoulder development" },
        { name: "Front Raises", sets: 4, reps: 15, description: "Anterior deltoid emphasis" }
      ],
      Friday: [
        { name: "Pull-ups", sets: 4, reps: 8, description: "Upper body pull strength" },
        { name: "Seated Cable Row", sets: 4, reps: 12, description: "Strengthening the middle back" },
        { name: "Face Pulls", sets: 4, reps: 15, description: "Rear deltoid and upper back focus" },
        { name: "Barbell Curl", sets: 4, reps: 12, description: "Bicep strengthening" },
        { name: "Hammer Curl", sets: 4, reps: 12, description: "Brachialis emphasis" }
      ],
      Saturday: [
        { name: "Accessory day", description: "Focus on accessory movements to support the main lifts, including bicep curls, tricep extensions, and abdominal work" }
      ],
      Sunday: [
        { name: "Rest day", description: "No exercises today, rest day" }
      ]
    }
  },
  {
    id: 9,
    title: "Advanced Cardio Master",
    difficulty: "Advanced",
    duration: "Extreme",
    focusArea: "Cardio",
    week: {
      Monday: [
        { name: "Interval Running", sets: 1, reps: "30 minutes", description: "Alternating sprints and jogging" },
        { name: "Cycling", sets: 1, reps: "30 minutes", description: "High intensity interval cycling" },
        { name: "Jump Rope", sets: 1, reps: "15 minutes", description: "Intense cardio session" }
      ],
      Tuesday: [
        { name: "Rowing", sets: 1, reps: "30 minutes", description: "High intensity interval rowing" },
        { name: "Stair Climber", sets: 1, reps: "30 minutes", description: "Steady pace high step climbing" },
        { name: "Box Jumps", sets: 3, reps: "20 jumps", description: "Explosive plyometric exercise" }
      ],
      Wednesday: [
        { name: "Swimming", sets: 1, reps: "30 minutes", description: "Mixed stroke swimming at high intensity" },
        { name: "Jump Rope", sets: 1, reps: "20 minutes", description: "High intensity jump rope intervals" },
        { name: "Burpees", sets: 3, reps: 15, description: "Full body cardio exercise" }
      ],
      Thursday: [
        { name: "Treadmill Incline Sprints", sets: 1, reps: "30 minutes", description: "Sprints at high incline" },
        { name: "Elliptical Trainer", sets: 1, reps: "30 minutes", description: "High resistance interval training" },
        { name: "Mountain Climbers", sets: 3, reps: "1 minute", description: "High intensity core and cardio workout" }
      ],
      Friday: [
        { name: "Trail Running", sets: 1, reps: "60 minutes", description: "Long distance running on trails" },
        { name: "Kettlebell Swings", sets: 3, reps: 20, description: "Full body cardio and strength exercise" }
      ],
      Saturday: [
        { name: "Triathlon Training Day", description: "Combination of swimming, cycling, and running" },
        { name: "Battle Ropes", sets: 3, reps: "1 minute", description: "High intensity upper body cardio workout" }
      ],
      Sunday: [
        { name: "Active Recovery", description: "Light activity such as walking or easy cycling" }
      ]
    }
  },
  {
    id: 10,
    title: "Ultimate Fitness Enthusiast",
    difficulty: "Advanced",
    duration: "Extreme",
    focusArea: "Mixed",
    week: {
      Monday: [
        { name: "CrossFit WOD (Workout of the Day)", sets: 1, reps: "Varies", description: "Includes a mixture of strength and cardio exercises" },
        { name: "Yoga", sets: 1, reps: "60 minutes", description: "For flexibility and recovery" },
        { name: "Rowing", sets: 1, reps: "30 minutes", description: "High intensity interval rowing" }
      ],
      Tuesday: [
        { name: "Powerlifting Routine", sets: 1, reps: "Varies", description: "Focus on squats, bench press, and deadlifts" },
        { name: "Plyometrics", sets: 1, reps: "30 minutes", description: "High-intensity jump training for explosive power" },
        { name: "HIIT", sets: 1, reps: "30 minutes", description: "High intensity interval training" }
      ],
      Wednesday: [
        { name: "Long-distance Running", sets: 1, reps: "10 km", description: "Steady state cardio for endurance" },
        { name: "Swimming", sets: 1, reps: "30 minutes", description: "High-intensity interval swimming for cardio and strength" },
        { name: "Cycling", sets: 1, reps: "30 minutes", description: "High intensity interval cycling" }
      ],
      Thursday: [
        { name: "HIIT Session", sets: 1, reps: "30 minutes", description: "High-intensity interval training focusing on cardio" },
        { name: "Strength Circuit", sets: 1, reps: "30 minutes", description: "Circuit training focusing on upper body, lower body, and core" },
        { name: "Burpees", sets: 3, reps: 15, description: "Full body cardio exercise" }
      ],
      Friday: [
        { name: "Olympic Weightlifting", sets: 1, reps: "Varies", description: "Technique-focused session on snatches and clean and jerks" },
        { name: "Pilates", sets: 1, reps: "60 minutes", description: "For core strengthening and flexibility" },
        { name: "Box Jumps", sets: 3, reps: 20, description: "Explosive plyometric exercise" }
      ],
      Saturday: [
        { name: "Adventure Day", description: "Outdoor activities such as hiking, biking, or rock climbing" },
        { name: "Kettlebell Swings", sets: 3, reps: 20, description: "Full body cardio and strength exercise" }
      ],
      Sunday: [
        { name: "Rest day", description: "Full recovery with optional light stretching or foam rolling" }
      ]
    }
  },
];

const WorkoutGrid = () => {
  const [workoutPlans, setWorkoutPlans] = useState(initialWorkoutPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [userPlanId, setUserPlanId] = useState(null);
  const userId = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(userId);
        setUserPlanId(userData.Plan.id);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Fetch every second

    return () => clearInterval(intervalId);
  }, [userId]);

  const startWorkout = (planId) => {
    const updatedPlans = workoutPlans.map(plan =>
      plan.id === planId
        ? { ...plan, isActive: true, isPaused: false }
        : { ...plan, isActive: false, isPaused: true }
    );
    setWorkoutPlans(updatedPlans);
    toast.success("Workout started!");
  };

  const pauseWorkout = (planId) => {
    const updatedPlans = workoutPlans.map(plan =>
      plan.id === planId
        ? { ...plan, isPaused: true }
        : plan
    );
    setWorkoutPlans(updatedPlans);
    toast("Workout paused.", { icon: "⏸️" });
  };

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const openVideoModal = () => {
    setVideoModalOpen(true);
  };

  return (
    <div className="workout-container">
      <div className="workout-grid">
        {workoutPlans.map((plan) => (
          <div
            key={plan.id}
            className={`workout-plan ${plan.id === userPlanId ? 'highlighted-plan' : ''}`}
            onClick={() => openModal(plan)}
          >
            <h3>{plan.title}</h3>
            <button onClick={(e) => { e.stopPropagation(); startWorkout(plan.id); }}>Start</button>
            <button onClick={(e) => { e.stopPropagation(); pauseWorkout(plan.id); }} disabled={!plan.isActive}>Pause</button>
            {plan.isActive && !plan.isPaused && <p>Workout Initiated...</p>}
            {plan.isPaused && <p>Workout Paused...</p>}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <WorkoutModal
          plan={selectedPlan}
          onClose={() => setIsModalOpen(false)}
        >
          <div>
            {Object.entries(selectedPlan.week).map(([day, exercises]) => (
              <div key={day}>
                <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>
                <ul>
                  {exercises.map((exercise, index) => (
                    <li key={index}>
                      {exercise.name === "Rest day"
                        ? exercise.description
                        : `${exercise.name} - ${exercise.sets} sets of ${exercise.reps} reps`}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </WorkoutModal>
      )}
      <div className="controls">
        <button className="video-guide-button" onClick={openVideoModal}>Video Guides</button>
      </div>
      {videoModalOpen && <VideoModal videos={videos} onClose={() => setVideoModalOpen(false)} />}
    </div>
  );
};

export default WorkoutGrid;