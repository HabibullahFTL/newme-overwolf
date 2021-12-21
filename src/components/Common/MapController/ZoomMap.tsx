import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import React, { useContext, useEffect, useState } from 'react';
import { RangeWithController } from '..';

export const ZoomMap = () => {
    const { mapController, setMapController } = useContext(DesktopAppContext)
    const [rangeValue, setRangeValue] = useState<number>(mapController?.zoom);

    useEffect(() => {
        setMapController({ ...mapController, zoom: rangeValue });
    }, [rangeValue])
    return (
        <div className="mt-2">
            <h4 className="text-lg text-center text-yellow1">Zoom Map</h4>
            <RangeWithController
                rangeValue={rangeValue}
                setRangeValue={setRangeValue}
                minValue={0}
                maxValue={6}
                perClickValue={1}
                isZeroAccepted={false} />
        </div>
    );
};
