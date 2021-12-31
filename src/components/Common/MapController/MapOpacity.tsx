import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import React, { useContext, useEffect, useState } from 'react';
import { RangeWithController } from '..';

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
        </div>
    );
};
