import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

function WorkoutForm() {
  const {dispatch} = useWorkoutContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const workout = {title, load, reps}
    const res = await fetch('/api/workouts',{
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = await res.json()
    console.log(res)
    if(!res.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }if(res.ok){
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields([])
      dispatch({type: "CREATE_WORKOUT", payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input placeholder="Excersize" type="text" onChange={(e)=>setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''}/>

      <label>Load (in kg):</label>
      <input placeholder="0" type="number" onChange={(e)=>setLoad(e.target.value)} value={load} className={emptyFields.includes('load') ? 'error' : ''}/>
      
      <label>Reps:</label>
      <input placeholder="0" type="number" onChange={(e)=>setReps(e.target.value)} value={reps} className={emptyFields.includes('reps') ? 'error' : ''}/>
      
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm