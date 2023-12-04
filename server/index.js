// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();
const PORT =  5000;

// Connect to MongoDB (replace 'your_mongo_uri' with your MongoDB connection string)
mongoose.connect('mongodb+srv://mridulsuneja1805:REYBmeYWGlfazFfQ@cluster0.ngwaboi.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema for the signup data
const signupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Create a MongoDB model based on the schema
const Signup = mongoose.model('Signup', signupSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle signup data

app.get("/",(req,res)=>{
    res.send("honePage");
})
app.post('/api/signup', async (req, res) => {
  try {
    // Create a new Signup instance with the data from the request body
    const newSignup = new Signup(req.body);

    // Save the new signup data to the database
    await newSignup.save();

    // Respond with a success message
    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
