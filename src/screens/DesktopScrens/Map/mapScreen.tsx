import { FilterBox, Map, MapController, SidebarAd, VideoAd } from "@/components/Common"
import React from "react"

export const MapScreen = () => {
    return (
        <>
            <Map />
            <MapController />
            <FilterBox />
            <VideoAd />
            <SidebarAd />
        </>
    )
}
