const express = require('express')
const connectDB = require('./config/database')
const workoutRoutes = require('./routes/workoutRouter')
const WorkoutModel = require('./model/WorkoutModel')

const app = express()

require('dotenv').config({path: './config/.env'})

connectDB()

// middleware a function that run everytime a req is sent
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req,res, next)=>{ // <== This is like using morgan as logger
  console.log(req.path, req.method)
  next()//need this to end middleware and for code to continue
})




// Routes
app.use('/api/workouts', workoutRoutes)

app.listen(process.env.PORT, ()=>{
  console.log(`Server is RUNNING in PORT:${process.env.PORT}`)
})