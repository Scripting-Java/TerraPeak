import { useState } from 'react'
import './App.css'
import {type game, type mountainTypes, type workerType } from './game/types'
import {getTotalPopulation } from './game/helpers'
import { handleMountain, handlePop, handleUpgrades, runCycle } from './game/logic'
import { create } from './game/initial'
import { variables } from './game/values'
import { mountains } from './game/mountains'
import { Sidebar } from './components/Sidebar'

function App() {

  const [current, setCurrent] = useState<game>(() => create())

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
      <Sidebar current={current} onPopChange={handlePopulation} onUpgrade={handleUpgrade} onMountain={handleMountains}></Sidebar>
      <h1 className='people'>TerraPeak Simulator</h1>
      <h2 className='people2'>(Pseudo)Simulate Populations On Mountain Peaks</h2>
      <h2 className='people2'>Total Population: {getTotalPopulation(current)}</h2>
      <h2 className='people2'>Mountain Production Buff: {variables.mountainBuffs[mountains.findIndex(m => m.name === current.mountain)]} X</h2>
      <h2 className='people2'>Still Alive: {String(!current.lost)}</h2>
      <button className='civsButton' onClick={handleCycle}>Press Me To Run A Cycle</button>
      <p className='disclaim'>THIS IS NOT IN ANYWAY MEANT TO REPRESENT REAL LIFE</p>

    </div>
  )
}
export default App
