import type { game, resourceType, workerType } from "../../../game/types"
import { workTypes } from "../../../game/types"
import { getTotalCivs } from "../../../game/helpers"
import { variables } from "../../../game/values"
import "./Workers.css"
interface workers {
    current: game,
    onPopChange: (type: workerType, amt: number) => void,
    onUpgrade: (type: workerType) => void
}
function getCost(type: workerType) {
    if (type === "lumberjack")
        return variables.lumberjackUpgradeCosts
    if (type === "farmer")
        return variables.farmerUpgradeCosts
    return variables.researcherUpgradeCosts
}

function getMaterial(type: workerType): resourceType {
    if (type === "lumberjack")
        return "wood"
    if (type === "farmer")
        return "peaches"
    return "gas"
}

export function Workers({ current, onPopChange, onUpgrade }: workers) {
    const totalCivs = getTotalCivs(current)
    return (
        <div className="workerPanel">
            <h2 className="reduceMargin">Workers</h2>
            <p>Available Civilians: {totalCivs}</p>
            {workTypes.map(type => {
                const costs = getCost(type)
                const upgradeCost = costs[current.upgrades[type]]
                const material = getMaterial(type)
                return (
                    <div key={type} className="worker">
                        <details>
                            <summary className="workerSum">
                                <h3>{type.charAt(0).toUpperCase() + type.substring(1, type.length)}s:</h3>
                                <p>{current.population[type]}</p>
                            </summary>

                            <div className="workerInfo">
                            <button className="workerButton" disabled={totalCivs === 0} onClick={() => onPopChange(type, 1)}>Add Worker</button>
                            <button className="workerButton" disabled={current.population[type] === 0} onClick={() => onPopChange(type, -1)}>Remove Worker</button>
                            <p>Upgrade Level: {current.upgrades[type]}</p>
                            <p>Upgrade Cost: {upgradeCost === undefined ? "Max Level" : `${upgradeCost} ${material}`}</p>
                            <button className="workerButton" disabled={upgradeCost === undefined || current.resources[(material)] < upgradeCost} onClick={() => onUpgrade(type)}>Upgrade</button>
                            </div>
                        </details>
                    </div>
                )
            })}
        </div>
    )
}