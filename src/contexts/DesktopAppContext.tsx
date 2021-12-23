import React from 'react';

export interface MenuDataType {
    menu: string[],
    active: string,
}

export type SetMenuDataType = React.Dispatch<React.SetStateAction<MenuDataType>>;

export interface ButtonDataType {
    id: number,
    text: string
}
export interface DataModel {
    [name: string]: object
}
export interface MarkerDataType {
    [name: string]: DataModel,
}

export interface FilterDataType {
    markerData: MarkerDataType,
    filterBtnData: ButtonDataType[],
    activeBtn: null | ButtonDataType,
    active: boolean
}

export type SetFilterDataType = React.Dispatch<React.SetStateAction<FilterDataType>>;

export interface MapController {
    zoom: number,
    opacity: number
}

export type SetMapController = React.Dispatch<React.SetStateAction<MapController>>;

export interface DesktopAppContext {
    menuData: MenuDataType,
    setMenuData: SetMenuDataType,
    filterData: FilterDataType,
    setFilterData: SetFilterDataType,
    mapController: MapController,
    setMapController: SetMapController,
}


export const DesktopAppContext = React.createContext<DesktopAppContext>({} as DesktopAppContext);