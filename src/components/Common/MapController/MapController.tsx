import React from "react"
import { MapOpacity } from "./MapOpacity"

export const MapController = () => {
    return (
        <div className="fixed top-[340px] z-[1000] left-16 w-52 bg-dark3 rounded-md">
            <MapOpacity />
            {/* <ZoomMap /> */}
        </div>
    )
}
