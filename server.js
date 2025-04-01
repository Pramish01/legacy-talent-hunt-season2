const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/legacy_talent', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Define a Schema
const RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// Handle Registration
app.post('/register', async (req, res) => {
    try {
        const newUser = new Registration(req.body);
        await newUser.save();
        res.json({ message: "Registration Successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));

