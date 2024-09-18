
const Workouts = require('../models/Workout');

const auth = require("../auth");
const Workout = require('../models/Workout');
const { errorHandler } = auth;

module.exports.addWorkOuts = (req, res) => {

    if(!req.user) {
        return res.status(401).send({message: 'User is not authenticated'})
    }

    const { id: userId } = req.user

    let newWorkOut = new Workouts({
        userId,
        name: req.body.name,
        duration: req.body.duration
    })



    Workouts.findOne({ name: req.body.name, })
    .then(existingWorkOut => {
        if(existingWorkOut){
            return res.status(409).send({
                message: 'Work Out already exist'
            })
        } else {
            return newWorkOut.save()
            .then(result => res.status(201).send(result))
        }
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getMyWorkOuts = (req, res) => {

    const { id: userId } = req.user;

    Workouts.find({ userId })
    .then(workouts => {
        res.status(200).send({
            workouts: workouts
        })
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.updateWorkOuts = (req, res) => {
    const { id } = req.params;
    const { name, duration, status } = req.body;

    if(!name && !duration && !status) {
        return res.status(400).send({message: 'No fields to update'});
    }

    Workouts.findByIdAndUpdate(
        id,
        { $set: {name, duration, status } },
        { new: true, runValidators: true}
    )
    .then(updatedWorkout => {
        if(!updatedWorkout) {
            return res.status(404).send({message: 'Workout not found'})
        }
        res.status(200).send({
            message: "Workout updated successfully",
            updatedWorkout
        })
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.deleteWorkOuts = (req, res) => {

    const { id } = req.params;

    Workouts.findByIdAndDelete(id)
    .then(deletedWorkout => {
        if(!deletedWorkout) {
            return res.status(404).send({message: "Workout not found"})
        }
        res.status(200).send({message: "Workout deleted successfully"})
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.completeWorkOuts = (req, res) => {

    const { id } = req.params;

    Workouts.findByIdAndUpdate(
        id,
        { status: 'completed' }, 
        { new: true }
    )
    .then(updatedWorkout => {
        if(!updatedWorkout) {
            return res.status(404).send({message: 'Workout not found'})
        }
        res.status(200).send({
            message: 'Workout status updated successfully',
            updatedWorkout
        })
    })
    .catch(error => errorHandler(error, req, res));
}