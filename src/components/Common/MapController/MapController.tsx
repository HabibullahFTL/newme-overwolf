import React from "react"
import { MapOpacity } from "./MapOpacity"
import { ZoomMap } from "./ZoomMap"

export const MapController = () => {
    return (
        <div className="fixed top-[330px] z-[1000] left-16 w-52 bg-dark3 rounded-md">
            <MapOpacity />
            <ZoomMap />
        </div>
    )
}
