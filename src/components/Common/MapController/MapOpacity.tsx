import React, { useState } from 'react';
import { RangeWithController } from '..';

export const MapOpacity = () => {
    const [rangeValue, setRangeValue] = useState<number>(100)
    return (
        <div className="">
            <h4 className="text-lg text-center text-yellow1">Map Opacity</h4>
            <RangeWithController
                rangeValue={rangeValue}
                setRangeValue={setRangeValue}
                minValue={0}
                maxValue={100}
                perClickValue={2}
                isZeroAccepted={false} />
        </div>
    );
};
