import { useState } from 'react'
import './App.css'
import { civTypes, workTypes, type civilian, type game, type workerType } from './game/types'
import { getTotalPopulation } from './game/helpers'
import { handlePop, handleUpgrades, runCycle } from './game/logic'
import { create } from './game/initial'
import { variables } from './game/values'
function App() {

  const [current, setCurrent] = useState<game>(() => create())


  function handleCycle() {
    setCurrent(prev => runCycle(prev))
  }

  function handlePopulation(type: civilian | workerType, amt: number) {
    setCurrent(prev => handlePop(prev, type, amt))
  }

  function handleUpgrade(type: workerType) {
    setCurrent(prev => handleUpgrades(prev, type))
  }


  return (
    <div>
      <h1 className='people'>People</h1>
      <h2 className='people2'>Total Population: {getTotalPopulation(current)}</h2>
      <details className='civs'>
        <summary>Civilians</summary>
        {civTypes.map(type => (
          <div key={type}>
            <button onClick={() => handlePopulation(type, 1)}>Add {type}</button>
            <button onClick={() => handlePopulation(type, -1)}>Subtract {type}</button>
            <p>{current.population.civilians[type]} {type} civilians</p>
          </div>
        ))}
      </details>
      <details className='civs'>
        <summary>Workers</summary>
        {workTypes.map(type => (
          <div key={type}>
            <button onClick={() => handlePopulation(type, 1)}>Add {type}</button>
            <button onClick={() => handlePopulation(type, -1)}>Subtract {type}</button>
            <p>{current.population[type]} {type} workers</p>
            <button onClick={() => handleUpgrade(type)}>Upgrade {type}</button>
            <h3>Upgrade Menus!</h3>
            <p>Production bonus: {variables.upgrades[current.upgrades[type]]}</p>
            <p>Upgrade Level: {current.upgrades[type]}</p>
          </div>
        ))}
      </details>

      <button className='civsButton' onClick={handleCycle}>Press Me To Run A Cycle</button>
      <details className='civs'>
        <summary>Resources</summary>
        <p>Wood: {current.resources.wood}</p>
        <p>Gas: {current.resources.gas}</p>
        <p>Peaches: {current.resources.peaches}</p>
        <p>Still Alive: {String(!current.lost)}</p>
        <h2>Mountain: {current.mountain}</h2>
      </details>
    </div>
  )
}
export default App
