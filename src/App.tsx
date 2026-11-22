import { useState } from 'react'
import './App.css'
import { civTypes, workTypes, type civilian, type game, type mountainTypes, type workerType } from './game/types'
import { getResConsumption, getTotalPopulation, getWorkerProd } from './game/helpers'
import { handleMountain, handlePop, handleUpgrades, handleWeather, runCycle } from './game/logic'
import { create } from './game/initial'
import { variables } from './game/values'
import { mountains } from './game/mountains'

function App() {

  const [current, setCurrent] = useState<game>(() => create())
  const production = getWorkerProd(current, current.weather)

  function handleCycle() {
    setCurrent(prev => runCycle(prev))
  }

  function handlePopulation(type: civilian | workerType, amt: number) {
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
      <h1 className='people'>People</h1>
      <h2 className='people2'>Total Population: {getTotalPopulation(current)}</h2>
      <h2>Mountain Production Buff: {variables.mountainBuffs[mountains.findIndex(m=>m.name===current.mountain)]*100}%</h2>
      <details className='civs'>
        <summary>Weather: {current.weather.weather}</summary>
        <p>Farmer Buffs: {current.weather.buffs.farmers}</p>
        <p>Lumberjack Buffs: {current.weather.buffs.lumberjacks}</p>
        <p>Researcher Buffs: {current.weather.buffs.researcher}</p>
      </details>

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
            <details>
            <summary>Upgrade Menus!</summary>
            <p>Production bonus: {variables.upgrades[current.upgrades[type]]}</p>
            <p>Upgrade Level: {current.upgrades[type]}</p>
            <p>Upgrade Cost: 
            {
              type === "lumberjack" ? variables.lumberjackUpgradeCosts[current.upgrades[type]]
              : type === "farmer" ? variables.farmerUpgradeCosts[current.upgrades[type]]
              : variables.researcherUpgradeCosts[current.upgrades[type]]
            } {type==="lumberjack" ? "Wood": type==="farmer" ? "Peaches": "Gas"}
            </p>
            </details>
          </div>
        ))}
      </details>

      <details className='civs'>
        <summary>Production</summary>
        <details className='civs'>
          <summary>Wood</summary>
          <p>Produced: {production.wood.toFixed(2)}</p>
          <p>Consumed: {(getResConsumption(current).wood).toFixed(2)}</p>
          <p>Net: {(production.wood-getResConsumption(current).wood).toFixed(2)}</p>
        </details>
        <details className='civs'>
          <summary>Gas</summary>
          <p>Produced: {production.gas.toFixed(2)}</p>
          <p>Consumed: {(getResConsumption(current).gas).toFixed(2)}</p>
          <p>Net: {(production.gas-getResConsumption(current).gas).toFixed(2)}</p>
        </details>
        <details className='civs'>
          <summary>Peaches</summary>
          <p>Produced: {production.peaches.toFixed(2)}</p>
          <p>Consumed: {(getResConsumption(current).peaches).toFixed(2)}</p>
          <p>Net: {(production.peaches-getResConsumption(current).peaches).toFixed(2)}</p>
        </details>
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
