import { useState } from 'react'
import './App.css'
import { civTypes, workTypes, type civilian, type game, type workerType } from './game/types'
import { getTotalPopulation} from './game/helpers'
import { handlePop, runCycle } from './game/logic'
import { create } from './game/initial'
function App() {
  
  const [current, setCurrent] = useState<game>(()=>create())

  
  function handleCycle(){
    setCurrent(prev=>runCycle(prev))
  }

  function handlePopulation(type:civilian|workerType, amt:number){
    setCurrent(prev=>handlePop(prev,type,amt))
  }
  

  return (
    <div>
      <h1>People</h1>
      <p>Total Population: {getTotalPopulation(current)}</p>

      <h2>Civilians</h2>

      {civTypes.map(type=>(
        <div key={type}>
          <button onClick={()=>handlePopulation(type,1)}>Add {type}</button>
          <button onClick={()=>handlePopulation(type,-1)}>Subtract {type}</button>
          <p>{current.population.civilians[type]} {type} civilians</p>
        </div>
      ))}

      <h2>Workers</h2>
      {workTypes.map(type=>(
        <div key={type}>
          <button onClick={()=>handlePopulation(type,1)}>Add {type}</button>
          <button onClick={()=>handlePopulation(type,-1)}>Subtract {type}</button>
          <p>{current.population[type]} {type} workers</p>
        </div>
      ))}
      
      <button onClick={handleCycle}>Run A Cycle</button>
      <h2>Resources</h2>
      <p>Wood: {current.resources.wood}</p>
      <p>Gas: {current.resources.gas}</p>
      <p>Peaches: {current.resources.peaches}</p>
      <p>Still Alive: {String(!current.lost)}</p>
      <h2>Mountain: {current.mountain}</h2>
    </div>
  )
}
export default App
