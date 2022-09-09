import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

// Components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

function Home() {
  // Global states - Hooks, context
  const {workouts, dispatch} = useWorkoutContext()
  
  useEffect(()=>{
    const fetchWorkout = async () =>{
      const res =  await fetch('/api/workouts') 
      // <== This is only for dev this needs to be change when done
      // http://localhost:3000//api/workouts
      const resJson = await res.json('/api/workouts')

      if(res.ok){
        dispatch({type: "SET_WORKOUTS", payload: resJson})
      }
    }
    fetchWorkout()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((x)=>(
          <WorkoutDetails key={x._id} workout={x}/>
          // <p key={x._id}>{x.title}</p>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home