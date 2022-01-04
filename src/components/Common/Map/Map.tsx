import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import L from 'leaflet';
import React, { useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import markerJson from './markersUpdated.json';

export const Map = () => {
    const [position, setPosition] = React.useState<any | null>(null)
    const { filterData, setFilterData } = useContext(DesktopAppContext)

    const xAdd: number = 8188,
        xDiv: number = 45.66,
        yAdd: number = -78.8,
        yDiv: number = 59.4,
        yM: number = 3.16 / 1000,
        yP: number = 8.16 / 10000000,
        yQ: number = 2.67 / 10000000000,
        yR: number = -2.39 / 100000000000000;

    const pos: object = (markerJson.POIs);
    Object.entries(pos).map(([key, landmark]) => {
        Object.entries(landmark).map(([_, mark]) => {
            if ((mark as { icon: string }).icon === 'township') {
                // console.log(mark);
            }
        })
    });

    const data = [
        {
            name: "ui_poi_town_brightwood",
            x: 9565.524,
            y: 6329.55
        },
        {
            name: "ui_poi_town_cutlass_keys",
            x: 7924.891,
            y: 1923.526
        },
        {
            name: "ui_poi_town_ebonscale_reach",
            x: 7270,
            y: 5388
        },
        {
            name: "ui_poi_town_everfall",
            x: 8895.444,
            y: 4214.787
        },
        {
            name: "ui_poi_town_first_light",
            x: 8833.27,
            y: 757.561
        },
        {
            name: "ui_poi_town_monarchs_bluffs",
            x: 7364.805,
            y: 3714.371,
        },
        {
            name: "ui_poi_town_mourningdale",
            x: 13163.402,
            y: 6976.256,
        },
        {
            name: "ui_poi_town_reekwater",
            x: 10987,
            y: 3290.75,
        },
        {
            name: "ui_poi_town_restless_shore",
            x: 12983.332,
            y: 4444.514
        },
        {
            name: "ui_poi_town_weavers_fen",
            x: 11452.477,
            y: 5332.724
        },
        {
            name: "ui_poi_town_windsward",
            x: 9351.972,
            y: 2718.424,
        }
    ]
    return (
        <div className="leaflet-container">
            <MapContainer center={{ lat: 0, lng: 0 }} zoom={2} zoomControl={false} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="http://algosolver.com">Algosolver</a> contributors'
                    url="map/{z}/{x}/{y}.jpg"
                    minZoom={2}
                    maxZoom={6}
                    noWrap={true}
                />
                {
                    filterData?.currentMarkers && filterData?.currentMarkers?.map((markerData: any) => {
                        // let tmp = { lat: (yAdd + yM * pos.y + yP * (pos.y ** 2) + yQ * (pos.y ** 3) + yR * (pos.y ** 4)), lng: (pos.x - xAdd) / xDiv }


                        const myIcon = L.icon({
                            iconUrl: `/assets/images/markerIcons/${markerData.icon}.png`
                        })
                        const position = { lat: markerData.lat, lng: markerData.lng }
                        return (
                            <Marker icon={myIcon} position={position} draggable={false} ref={(r) => { r?.openPopup() }} key={markerData.id}>
                                {/* <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>Hello</Tooltip> */}
                                <Popup position={position}>
                                    Current location: <pre>{JSON.stringify(position, null, 2)} - {JSON.stringify(pos, null, 2)}</pre>
                                </Popup>
                            </Marker>
                        );
                    })
                }
            </MapContainer>
        </div>
    );
};