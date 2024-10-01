const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { User, createUser, findUserByEmail, updateUser, generateResetToken } = require('./models/UserDataModel.js'); 
const { Session, createSession, findSessionByUserId } = require('./models/TrainingSessionDataModel.js'); 
const saltRounds = 10; // Define salt rounds

const app = express();
app.use(express.json()); // For parsing application/json

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT' , 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Muscle-Mania';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 4999;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// User registration route
app.post("/register", async (req, res) => {
  const { email, password, fullName, HashPaswoord } = req.body;
  try {
    // Check if user already exists using the findUserByEmail method
    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user using the createUser method
    await createUser(fullName, email, password);
    
    res.status(201).json({ message: "User registered successfully" });
  } 
  catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error/register" });
  }
});


// Register - User detail route
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find User based on user's ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the user as a JSON response
    res.status(200).json(user);
  } 
  catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Intern serverfejl" });
  }
});


// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Find user by email using the findUserByEmail function from Database.js
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Debuggin: log the user's E-mail and password to the console
    console.log("User's Email", email);
    console.log("Password entered by user:", password);
    console.log("Hashed password stored in database:", user.hashedPassword);
    // console.log("User's hashed password: ", HashPaswoord);

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Respons back to the client
    res.status(200).json(user._id); 
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error LOGIN' });
  }
});


// User detail route by email
app.get("/users/email/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    // Find User based on user's email
    const user = await findUserByEmail(userEmail); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the user as a JSON response
    res.status(200).json(user);
  } 
  catch (error) {
    console.error("Error - Cant get User:", error);
    res.status(500).json({ message: "Internal server error /users/email/:email " });
  }
});


// Forgot password route
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email using the findUserByEmail method
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    
    }
    // Generate and save reset token
    console.log("Generating reset token...");
    const { resetToken, expirationDate } = await generateResetToken();
    console.log("Generated reset token:", resetToken);
    user.resetToken = resetToken;
    user.resetTokenExpiry = expirationDate;
    await user.save();

    res.status(200).json({ message: "ResetToken Succesfully created", resetToken });
  } 
  catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error/forgot-password" });
  }
});


// Get latest password reset request by user's email
app.get("/users/email/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    console.log("Searching for user with email:", userEmail);

    // Find the user based on email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    // Check if the user has a password reset token and it's not expired
    if (!user.resetToken || user.resetTokenExpiry < Date.now()) {
      console.log("No password reset request found for this user");
      return res.status(404).json({ message: "No password reset request found for this user" });
    }

    // Return the reset token details as a JSON response
    console.log("Returning reset token details:", user.resetToken, user.resetTokenExpiry);
    
    res.status(200).json({
      resetToken: user.resetToken,
      resetTokenExpiry: user.resetTokenExpiry,
    });
  } 
  catch (error) {
    console.error("Error getting latest password reset request:", error);
    res.status(500).json({ message: "Internal server error*/users/email/:email*" });
  }
});



// PUT route for updating user password
app.put("/reset-password/:email", async (req, res) => {
  const userEmail = req.params.email;
  const { newPassword, resetToken } = req.body;

   // Check if newPassword is defined
   if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    console.log("Received request to update password for email:", userEmail);
    console.log("Received reset token:", resetToken); // Log the reset token

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    
    // Update user's password
    const updatedUser = await updateUser(userEmail, newPassword, resetToken);

    console.log("Password updated successful for user:", updatedUser.email);

    // Send a success message
    res.status(200).json({ message: "Password updated successfully" });
  } 
  catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error*/reset-password/:email*" });
  }
});



// GET route for retrieving user by email
app.get("/users/email/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    console.log("Received request for user information for email:", userEmail);

    // Find user based on email
    const user = await User.findOne({ email: userEmail });
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Don't send the password back to the client
    const userWithoutPassword = { ...user._doc, password: undefined };

    res.status(200).json(userWithoutPassword);
  } 
  catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error/users/email/:email" });
  }
});

/********************************************************************************************************************************** */

//bruges til at tilføje data til brugeren efter spørgeskemaet
app.post('/updateUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    console.log("Updating user", userId, "with data", updates);

    // Find the user by ID and update it with the provided data
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated', userData: user });
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});



app.post('/survey/complete/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { surveyCompleted: true },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Bruger ikke fundet' });
    }
    res.status(200).json({ message: 'Spørgeskema markeret som fuldført', userId: updatedUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Kunne ikke opdatere brugeren', error: error.message });
  }
});

  

app.get('/user/surveyStatus/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId, 'surveyCompleted');
    if (!user) {
      return res.status(404).json({ message: 'Bruger ikke fundet' });
    }
    res.status(200).json({ surveyCompleted: user.surveyCompleted });
  } catch (error) {
    res.status(500).json({ message: 'Fejl ved hentning af survey status', error: error.message });
  }
});




  // GET user data excluding username, email, and password
app.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId, '-username -password');
    if (!user) {
      return res.status(404).json({ message: 'Bruger ikke fundet' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Fejl ved hentning af bruger', error: error.message });
  }
});

app.post('/user/plan/:userId', async (req, res) => {
  const { userId } = req.params;
  const { plan } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { Plan: plan } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('Failed to update user plan');
  }
});


//Session requests

//Post route for new session
// User registration route
app.post("/session/:userId", async (req, res) => {
  
  const { weekNumber, exerciseName, sets, reps} = req.body;
  try {
    const matchingId = req.params.userId;
    // find the user doing the exercise
    if (!weekNumber || !exerciseName) {
      return res.status(400).json({ message: "Week Number and exercise Name are required" });
    }
    if (!sets || !reps) {
      return res.status(400).json({ message: "number of sets and reps are required" });
    }

    const existingUser = await User.findById(matchingId);
    
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create new session using the createUser method
    await createSession(matchingId, weekNumber, exerciseName, sets, reps);
    
    res.status(201).json({ message: "Session created successfully" });
  } 
  catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error/register" });
  }
});

//get all sessions for a user
app.get('/session/:userId', async (req, res) => {
  try {
    const matchingId = req.params.userId;
    const session = await findSessionByUserId(matchingId);
    if (!session) {
      return res.status(404).json({ message: 'No sessions found.' });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Fejl ved hentning af session', error: error.message });
  }
});

