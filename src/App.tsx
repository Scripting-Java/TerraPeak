import { useState } from 'react'
import './App.css'
import type { civilian, game, workerType } from './game/types'
import { getTotalCivs, getTotalPopulation, getTotalWorkers } from './game/helpers'
import { runCycle } from './game/logic'
function App() {

  const [current, setCurrent] = useState<game>({
    population: {
      lumberWorkers: 0, researchers: 0, farmers: 0,
      civilians: { normal: 0, shiny: 0, lazy: 0 }
    },
    resources: { wood: 0, gas: 0, peaches: 0 },
    upgrades: { lumberjack: 0, researcher: 0, farmer: 0 },
    playerLevel: 1,
    mountain: "Washington",
    trees: 50,
    treeGrowth: 0,
    lost: false
  })

  function handlePopulation(type: civilian | workerType, amt: number) {
    setCurrent(prev => {
      if (type === "lazy" || type === "normal" || type === "shiny") {
        const newAmt = prev.population.civilians[type] + amt
        if (newAmt < 0)
          return prev
        return {
          ...prev,
          population: {...prev.population,
            civilians: {...prev.population.civilians,[type]: newAmt}
          }
        }
      }
      if (type !== "lumberjack" && type !== "researcher" && type !== "farmer")
        return prev
      let worker: "lumberWorkers" | "researchers" | "farmers" = "lumberWorkers"
      if (type === "farmer")
        worker = "farmers"
      if (type === "researcher")
        worker = "researchers"
      const newAmt = prev.population[worker] + amt
      if (newAmt < 0)
        return prev
      return {
        ...prev, population: { ...prev.population, [worker]: newAmt }
      }
    })
  }

  function handleCycle(){
    setCurrent(prev=>runCycle(prev))
  }

  return (
    <div>
      <h1>People</h1>
      <p>Total Population: {getTotalPopulation(current)}</p>

      <h2>Civilians</h2>
      <p>Total Civlians: {getTotalCivs(current)}</p>

      <button onClick={() => handlePopulation("lazy", 1)}>Add Lazy</button>
      <button onClick={() => handlePopulation("lazy", -1)}>Subtract Lazy</button>
      <p>{current.population.civilians.lazy} Lazy Civilians</p>

      <button onClick={() => handlePopulation("normal", 1)}>Add Normal</button>
      <button onClick={() => handlePopulation("normal", -1)}>Subtract Normal</button>
      <p>{current.population.civilians.normal} Normal Civilians</p>

      <button onClick={() => handlePopulation("shiny", 1)}>Add Shiny</button>
      <button onClick={() => handlePopulation("shiny", -1)}>Subtract Shiny</button>
      <p>{current.population.civilians.shiny} Shiny Civilians</p>

      <h2>Workers</h2>
      <p>Total Workers: {getTotalWorkers(current)}</p>

      <button onClick={() => handlePopulation("lumberjack", 1)}>Add lumberjacks</button>
      <button onClick={() => handlePopulation("lumberjack", -1)}>Subtract Lumberjacks</button>
      <p>{current.population.lumberWorkers} Lumberjacks</p>

      <button onClick={() => handlePopulation("researcher", 1)}>Add researchers</button>
      <button onClick={() => handlePopulation("researcher", -1)}>Subtract researcher</button>
      <p>{current.population.researchers} researchers</p>

      <button onClick={() => handlePopulation("farmer", 1)}>Add farmers</button>
      <button onClick={() => handlePopulation("farmer", -1)}>Subtract farmer</button>
      <p>{current.population.farmers} farmers</p>
      <button onClick={()=>handleCycle()}>Run A Cycle</button>
      <h2>Resources</h2>
      <p>Wood: {current.resources.wood}</p>
      <p>Gas: {current.resources.gas}</p>
      <p>Peaches: {current.resources.peaches}</p>
      <p>Still Alive: {!current.lost}</p>
      <h2>Mountain: {current.mountain}</h2>
    </div>
  )
}

export default App
