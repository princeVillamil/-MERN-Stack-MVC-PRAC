const WorkoutModel = require('../model/WorkoutModel')
const mongoose = require('mongoose')

module.exports = {
  // ==========Get all workout==========
  getAllWorkout: async(req,res)=>{
    const workouts = await WorkoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
  },
  // ==========Get single workout==========
  getSingleWorkout: async(req,res)=>{
    const { id } = req.params

    // Checks if id is valid because sometimes id are not valid
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'})

    const workout = await WorkoutModel.findById(id)
    if(!workout) return res.status(404).json({error:"No such wokrout"})
    res.status(200).json(workout)
  },

  // ==========Create new workout==========
  createWorkout: async(req,res)=>{
    const {title, load, reps} = req.body
    try {
      const workout = await WorkoutModel.create({title,load,reps})
      res.status(200).json(workout)
    } catch (err) {
      res.status(404).json({error: err.message})
    }
  },

  // ==========Delete a workout==========
  deleteWorkout: async(req,res)=>{
    const {id} = req.params
    // Checks if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'})
    const workout = await WorkoutModel.findOneAndDelete({_id: id})
    if(!workout) return res.status(404).json({error:"No such wokrout"})
    res.status(200).json(workout)
  },

  // ==========Update a workout==========
  updateWorkout: async(req,res)=>{
    const {id} = req.params
    // Checks if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'})
    const workout = await WorkoutModel.findOneAndUpdate({_id:id},{
      ...req.body // <=== this really smart
    })
    if(!workout) return res.status(404).json({error:"No such wokrout"})
    res.status(200).json(workout)
  }
}



