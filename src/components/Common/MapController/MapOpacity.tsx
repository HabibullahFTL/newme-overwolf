import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import { chestsFormattedData } from '@/helpers/markersController';
import React, { useContext, useEffect, useState } from 'react';
import { RangeWithController } from '..';
import markerJson from '../Map/markersUpdated.json';

export const MapOpacity = () => {
    const { mapController, setMapController } = useContext(DesktopAppContext)
    const [rangeValue, setRangeValue] = useState<number>(mapController?.opacity);

    useEffect(() => {
        setMapController({ ...mapController, opacity: rangeValue });
    }, [rangeValue])
    return (
        <div className="">
            <h4 className="text-lg text-center text-yellow1">Map Opacity</h4>
            <RangeWithController
                rangeValue={rangeValue}
                setRangeValue={setRangeValue}
                minValue={0}
                maxValue={100}
                perClickValue={5}
                isZeroAccepted={false} />
            <button onClick={() => console.log(chestsFormattedData(markerJson?.chests))} className="py-2 px-4 text-white">Click</button>
        </div>
    );
};
