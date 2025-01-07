import React from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"

const geoUrl =
    "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

export default function MapChart() {
    return (
        <ComposableMap
            style={{
                width: "100vw",
                height: "100vh",
            }}
        >
            <ZoomableGroup>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: { fill: "#D6D6DA", outline: "none" },
                                    hover: { fill: "#F53", outline: "none" },
                                    pressed: { fill: "#E42", outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}