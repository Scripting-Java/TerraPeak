import type { game } from "../../../game/types";
import "./Weather.css"

interface weather {
    current: game
}

export function Weather({ current }: weather) {
    return (
        <div className="weather">
            <h2>Weather</h2>
            <p>Current Weather: {current.weather.weather}</p>
            <details>
                <summary>Weather Effects:</summary>
                <p>Farmer Production Boost: {current.weather.buffs.farmers}</p>
                <p>Lumberjack Production Boost: {current.weather.buffs.lumberjacks}</p>
                <p>Researcher Production Boost: {current.weather.buffs.researcher}</p>
            </details>
        </div>
    )
}