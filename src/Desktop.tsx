import React, { useState } from 'react';
import markerJson from './components/Common/Map/markers.json';
import { DesktopLayout } from './components/Layouts/DekstopLayout/DesktopLayout';
import { DesktopAppContext, FilterDataType, MarkerDataType, MenuDataType } from './contexts/DesktopAppContext';
import DesktopHeader from './DesktopHeader';
import { JournalScreen, MapScreen } from './screens/DesktopScrens';

export default function Desktop() {
    const keys = Object.keys(markerJson);
    const btnsData = keys.map((item, index) => ({ id: index, text: item }))

    const customFilterData = {
        markerData: markerJson as MarkerDataType,
        filterBtnData: btnsData,
        activeBtn: null,
        active: false
    }
    // States 
    const [menuData, setMenuData] = useState({
        menu: ["mapScreen", "journalScreen"],
        active: "mapScreen",
    } as MenuDataType);
    const [filterData, setFilterData] = useState(customFilterData as FilterDataType)
    const [mapController, setMapController] = useState({ zoom: 2, opacity: 100 })

    return (
        <DesktopAppContext.Provider value={{ menuData, setMenuData, filterData, setFilterData, mapController, setMapController }}>
            <div className="overflow-hidden h-screen" style={{ opacity: (mapController?.opacity / 100) }}>
                <DesktopHeader />
                <div style={{ height: "calc(100vh - 32px)" }} className="overflow-hidden">
                    <DesktopLayout>
                        {menuData?.active === "mapScreen" && <MapScreen />}
                        {menuData?.active === "journalScreen" && <JournalScreen />}
                    </DesktopLayout>
                </div>
            </div>
        </DesktopAppContext.Provider>
    );
}
