import React, { useState } from 'react';
import { DesktopLayout } from './components/Layouts/DekstopLayout/DesktopLayout';
import { DesktopAppContext, FilterDataType, MenuDataType } from './contexts/DesktopAppContext';
import DesktopHeader from './DesktopHeader';
import { JournalScreen, MapScreen } from './screens/DesktopScrens';

const customFilterData = {
    filterBtnData: [
        { id: 1, text: "Cities" },
        { id: 2, text: "NPC's" },
        { id: 3, text: "Zones" },
        { id: 4, text: "Location" },
        { id: 5, text: "Plants" },
        { id: 6, text: "Wood" },
        { id: 7, text: "Fishing" },
        { id: 8, text: "Chests" },
        { id: 9, text: "Documents" },
        { id: 10, text: "Ores" },
        { id: 11, text: "Essences" },
        { id: 12, text: "Monsters" },
    ],
    activeBtn: null,
    active: false
}


export default function Desktop() {
    const [menuData, setMenuData] = useState({
        menu: ["mapScreen", "journalScreen"],
        active: "mapScreen",
    } as MenuDataType);
    const [filterData, setFilterData] = useState(customFilterData as FilterDataType)
    const [mapController, setMapController] = useState({ zoom: 2, opacity: 100 })

    return (
        <DesktopAppContext.Provider value={{ menuData, setMenuData, filterData, setFilterData, mapController, setMapController }}>
            <div className="overflow-hidden h-screen">
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
