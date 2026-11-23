import { useState } from 'react'
import './App.css'
import { workTypes, type game, type mountainTypes, type workerType } from './game/types'
import { getResConsumption, getTotalPopulation, getWorkerProd } from './game/helpers'
import { handleMountain, handlePop, handleUpgrades, runCycle } from './game/logic'
import { create } from './game/initial'
import { variables } from './game/values'
import { mountains } from './game/mountains'
import { Sidebar } from './components/Sidebar'

function App() {

  const [current, setCurrent] = useState<game>(() => create())
  const production = getWorkerProd(current, current.weather)

  function handleCycle() {
    setCurrent(prev => runCycle(prev))
  }

  function handlePopulation(type: workerType, amt: number) {
    setCurrent(prev => handlePop(prev, type, amt))
  }

  function handleUpgrade(type: workerType) {
    setCurrent(prev => handleUpgrades(prev, type))
  }

  function handleMountains(mountain: mountainTypes) {
    setCurrent(prev => handleMountain(prev, mountain))
  }


  return (
    <div>
      <Sidebar current={current} production={production} onPopChange={handlePopulation} onUpgrade={handleUpgrade} onMountain={handleMountains}></Sidebar>
      <h1 className='people'>People</h1>
      <h2 className='people2'>Total Population: {getTotalPopulation(current)}</h2>
      <h2>Mountain Production Buff: {variables.mountainBuffs[mountains.findIndex(m => m.name === current.mountain)]} X</h2>
      <h2>Still Alive: {String(!current.lost)}</h2>

      <details className='civs'>
        <summary>Production</summary>
        <details className='civs'>
          <summary>Wood</summary>
          <p>Produced: {production.wood.toFixed(2)}</p>
          <p>Consumed: {(getResConsumption(current).wood).toFixed(2)}</p>
          <p>Net: {(production.wood - getResConsumption(current).wood).toFixed(2)}</p>
        </details>
        <details className='civs'>
          <summary>Gas</summary>
          <p>Produced: {production.gas.toFixed(2)}</p>
          <p>Consumed: {(getResConsumption(current).gas).toFixed(2)}</p>
          <p>Net: {(production.gas - getResConsumption(current).gas).toFixed(2)}</p>
        </details>
        <details className='civs'>
          <summary>Peaches</summary>
          <p>Produced: {production.peaches.toFixed(2)}</p>
          <p>Consumed: {(getResConsumption(current).peaches).toFixed(2)}</p>
          <p>Net: {(production.peaches - getResConsumption(current).peaches).toFixed(2)}</p>
        </details>
      </details>

      <button className='civsButton' onClick={handleCycle}>Press Me To Run A Cycle</button>

      <details className='civs'>
        <summary>Mountains</summary>
        {mountains.map((mountain, index) => {
          const mountUnlocked = getTotalPopulation(current) >= variables.mountainReqs[index]
          return (
            <div key={mountain.name}>
              <details>
                <summary>{mountain.name}</summary>
                <p>Population Required: {variables.mountainReqs[index]}</p>
                <p>Trees: {mountain.trees}</p>
                <p>Gas Vents: {mountain.gasVents}</p>
                <p>Peach Farms: {mountain.peachFarms}</p>
                {current.mountain === mountain.name ?
                  (<p>Current Location</p>) :
                  (
                    <button disabled={!mountUnlocked} onClick={() => handleMountains(mountain.name)}>
                      {mountUnlocked ? "Travel Here" : "Locked"}</button>
                  )
                }
              </details>
            </div>)
        })}
      </details>
    </div>
  )
}
export default App
