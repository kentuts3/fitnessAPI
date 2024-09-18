const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/user");
const workoutRoutes = require('./routes/workout');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_STRING)
.then(() => console.log('Now connected to MongoDB Atlas'))
.catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // If you need CORS

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

if (require.main === module) {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
    });
}

module.exports = { app, mongoose };