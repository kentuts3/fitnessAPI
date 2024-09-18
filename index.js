const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require("./routes/user")
const workoutRoutes = require('./routes/workout')

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes)

if(require.main === module){
	app.listen(process.env.PORT || 3000, () => {
		console.log(`API is now online on port ${ process.env.PORT || 3000}`)
	});
}

module.exports = {app, mongoose};