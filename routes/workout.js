const express = require('express');
const workoutController = require('../controllers/workout')
const { verify } = require("../auth");

const router = express.Router();

router.post('/addWorkout', verify, workoutController.addWorkOuts);

router.get('/getMyWorkout', verify, workoutController.getMyWorkOuts);

router.put('/updateWorkout/:id', verify, workoutController.updateWorkOuts);

router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkOuts);

router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkOuts)

module.exports = router;