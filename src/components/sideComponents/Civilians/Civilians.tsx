import { getTotalCivs, getTotalPopulation } from "../../../game/helpers";
import type { game} from "../../../game/types";
import { civTypes } from "../../../game/types";
import "./Civilians.css"
import { variables } from "../../../game/values";

interface Civs{
    current:game,
}

export function Civilians({current}:Civs){
    const total = getTotalCivs(current)
    const totalPop = getTotalPopulation(current)
    const minReq = Math.ceil(totalPop*variables.minCivPercent/100)
    return(
        <div className="civPanel">
            <h2>Civilians</h2>
            <p className="civTotal">Available Civilians: {total}</p>
            <p className="civTotal">Required Civilians: {minReq} ({variables.minCivPercent}%)</p>
            {civTypes.map(type=>(
                <div className="civCard" key={type}>
                    <h3>{type.charAt(0).toUpperCase()+type.substring(1,type.length)} Civilians: </h3>
                    <p>{current.population.civilians[type]}</p>
                </div>
            ))}
        </div>
    )
}