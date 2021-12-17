import React, { useState } from 'react';
import { RangeWithController } from '..';

export const ZoomMap = () => {
    const [rangeValue, setRangeValue] = useState<number>(4)
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
