import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import L from 'leaflet';
import React, { useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';


export const Map = () => {
    const { filterData, setFilterData } = useContext(DesktopAppContext)

    return (
        <div className="leaflet-container">
            <MapContainer preferCanvas={true} renderer={L.canvas()} center={{ lat: 0, lng: 0 }} zoom={2} zoomControl={false} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="http://algosolver.com">Algosolver</a> contributors'
                    url="map/{z}/{x}/{y}.jpg"
                    minZoom={2}
                    maxZoom={6}
                    noWrap={true}
                />
                <MarkerClusterGroup disableClusteringAtZoom={2}>
                    {
                        filterData?.currentMarkers && filterData?.currentMarkers?.map((markerData: any) => {
                            const myIcon = L.icon({
                                iconUrl: `/assets/images/markerIcons/${markerData.icon}.png`,
                                iconSize: [32, 32]
                            })
                            const position = { lat: markerData.lat, lng: markerData.lng }
                            return (
                                <Marker icon={myIcon} position={position} draggable={false} ref={(r) => { r?.openPopup() }} key={markerData.id}>
                                    {/* <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>Hello</Tooltip> */}
                                    <Popup position={position}>
                                        Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
                                    </Popup>
                                </Marker>
                            );
                        })
                    }
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};