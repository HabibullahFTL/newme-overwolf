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
    currentMarkers: any,
    filteringOptions: any,
    activeBtn: null | ButtonDataType,
    active: boolean
}

export type SetFilterDataType = React.Dispatch<React.SetStateAction<FilterDataType>>;

export interface MapController {
    zoom: number,
    opacity: number
}

export type SetMapController = React.Dispatch<React.SetStateAction<MapController>>;

export interface UserDataType {
    isLoggedIn: boolean,
    token: string,
    battleTag: string,
    battleId: string,
    region: string,
    userInfo: object,
}

export type SetUserDataType = React.Dispatch<React.SetStateAction<UserDataType>>;

export interface DesktopAppContext {
    menuData: MenuDataType,
    setMenuData: SetMenuDataType,
    filterData: FilterDataType,
    setFilterData: SetFilterDataType,
    mapController: MapController,
    setMapController: SetMapController,
    userData: UserDataType,
    setUserData: SetUserDataType,
}


export const DesktopAppContext = React.createContext<DesktopAppContext>({} as DesktopAppContext);