import type { game, mountainTypes } from "../../../game/types";
import { mountains } from "../../../game/mountains";
import { variables } from "../../../game/values";
import { getTotalPopulation } from "../../../game/helpers";
import "./Mountains.css"

interface Mountain{
    current:game,
    onMountain: (mountain:mountainTypes) =>void
}

export function Mountains({current,onMountain}:Mountain){
    const population = getTotalPopulation(current)
    return(
        <div className="mountains">
            {mountains.map((mountain,index)=>{
                const unlocked = population>=variables.mountainReqs[index]
                const picked = current.mountain===mountain.name

                return(
                    <div className="mountain" key={mountain.name}>
                        <details>
                        <summary className="mountSum"><h3>{mountain.name}</h3></summary>
                        <p>Population Required: {variables.mountainReqs[index]}</p>
                        <p>Trees: {mountain.trees}</p>
                        <p>Gas Vents: {mountain.gasVents}</p>
                        <p>Peach Farms: {mountain.peachFarms}</p>
                        <button disabled={!unlocked||picked} onClick={()=>onMountain(mountain.name)}>
                            {picked ? "Current Mountain": unlocked? "Travel" : "Locked"}
                        </button>
                        </details>
                    </div>
                )
            })}
        </div>
    )
}