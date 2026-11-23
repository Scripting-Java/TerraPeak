import type { game } from "../../../game/types"
import { getResConsumption } from "../../../game/helpers"
import "./Consumption.css"
interface consumption{
    current:game
}

export function Consumption({current}: consumption){
    const consumption = getResConsumption(current)

    return(
        <div className="consumption">
            <h2>Resource Consumption</h2>
            <p>Wood: {consumption.wood.toFixed(2)} / Cycle</p>
            <p>Gas: {consumption.gas.toFixed(2)} / Cycle</p>
            <p>Peaches: {consumption.peaches.toFixed(2)} / Cycle</p>
        </div>
    )
}