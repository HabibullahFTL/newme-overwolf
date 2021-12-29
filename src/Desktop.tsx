import React, { useState } from 'react';
import markerJson from './components/Common/Map/markersUpdated.json';
import { DesktopLayout } from './components/Layouts/DekstopLayout/DesktopLayout';
import { DesktopAppContext, FilterDataType, MarkerDataType, MenuDataType, UserDataType } from './contexts/DesktopAppContext';
import DesktopHeader from './DesktopHeader';
import { chestsFormattedData } from './helpers/markersController';
import { JournalScreen, MapScreen } from './screens/DesktopScrens';

export default function Desktop() {
    const chests = chestsFormattedData(markerJson?.chests);
    const customMarkersData = {
        chests
    }
    const keys = Object.keys(customMarkersData);
    const btnsData = keys.map((item, index) => ({ id: index, text: item }))

    const customFilterData = {
        markerData: customMarkersData as MarkerDataType,
        filterBtnData: btnsData,
        currentMarkers: {},
        activeBtn: null,
        active: false
    }
    const customUserData = {
        isLoggedIn: false,
        token: "",
        battleTag: "",
        battleId: "",
        region: "",
        userInfo: {},
    }

    // States 
    const [menuData, setMenuData] = useState({
        menu: ["mapScreen", "journalScreen"],
        active: "mapScreen",
    } as MenuDataType);
    const [filterData, setFilterData] = useState(customFilterData as FilterDataType)
    const [mapController, setMapController] = useState({ zoom: 2, opacity: 100 })
    const [userData, setUserData] = useState({} as UserDataType)

    return (
        <DesktopAppContext.Provider value={{ menuData, setMenuData, filterData, setFilterData, mapController, setMapController, userData, setUserData }}>
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
