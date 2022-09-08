const express = require('express')
const router = express.Router()
const workoutController = require('../controller/workoutController')

// All workouts
router.get('/', workoutController.getAllWorkout)
// Single workouts
router.get('/:id', workoutController.getSingleWorkout)
// Create workouts
router.post('/', workoutController.createWorkout)
// Delete workouts
router.delete('/:id', workoutController.deleteWorkout)
// Update workouts
router.patch('/:id', workoutController.updateWorkout)

module.exports = router