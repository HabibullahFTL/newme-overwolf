import React, { useEffect, useState } from 'react';

type RangeWithControllerType = {
    rangeValue: number,
    setRangeValue: any,
    minValue: number,
    maxValue: number,
    perClickValue: number,
    isZeroAccepted: boolean
};

export const RangeWithController = ({ rangeValue, setRangeValue, minValue = 0, maxValue = 100, perClickValue = 2, isZeroAccepted = false }: RangeWithControllerType) => {
    const [lefPosition, setLefPosition] = useState<number>(0);
    const [rangeValuePercent, setRangeValuePercent] = useState<number>(0);

    useEffect(() => {
        // Handling when the value is 0
        if (rangeValue < 1 && !isZeroAccepted) {
            setRangeValue(1)
        }

        // Setting the let position value
        setLefPosition(() => {
            const onePercent = maxValue / 100;

            // Setting the active percentage
            setRangeValuePercent(rangeValue / onePercent);

            if (rangeValuePercent < 6) {
                return (128 * (rangeValuePercent / 100));
            }
            else if (rangeValuePercent >= 6 && rangeValuePercent < 14) {
                return (128 * (rangeValuePercent / 100)) - 2;
            }
            else if (rangeValuePercent >= 14 && rangeValuePercent < 20) {
                return (128 * (rangeValuePercent / 100)) - 4;
            }
            else if (rangeValuePercent >= 20 && rangeValuePercent < 30) {
                return (128 * (rangeValuePercent / 100)) - 8;
            }
            else if (rangeValuePercent >= 30 && rangeValuePercent < 40) {
                return (128 * (rangeValuePercent / 100)) - 10;
            }
            else if (rangeValuePercent >= 40 && rangeValuePercent < 50) {
                return (128 * (rangeValuePercent / 100)) - 12;
            }
            else if (rangeValuePercent >= 50 && rangeValuePercent < 60) {
                return (128 * (rangeValuePercent / 100)) - 15;
            }
            else if (rangeValuePercent >= 60 && rangeValuePercent < 70) {
                return (128 * (rangeValuePercent / 100)) - 18;
            }
            else if (rangeValuePercent >= 70 && rangeValuePercent < 80) {
                return (128 * (rangeValuePercent / 100)) - 20;
            }
            else if (rangeValuePercent >= 80 && rangeValuePercent < 90) {
                return (128 * (rangeValuePercent / 100)) - 23;
            }
            else if (rangeValuePercent >= 90 && rangeValuePercent < 100) {
                return (128 * (rangeValuePercent / 100)) - 26;
            }
            else if (rangeValuePercent >= 100) {
                return (128 * (rangeValuePercent / 100)) - 28;
            } else {
                return (128 * (rangeValuePercent / 100));
            }
        })
    }, [maxValue, rangeValue, rangeValuePercent])
    return (
        <div className="relative w-full h-10 flex items-center justify-between">
            <button
                className="w-8 outline-none active:scale-90 transform transition duration-150"
                title="Decrease"
                onClick={() => setRangeValue((prevValue: number) => prevValue > perClickValue ? (prevValue - perClickValue) <= 0 ? 0 : ((prevValue - perClickValue)) : prevValue)}>
                <img src="/assets/images/left-arrow.svg" alt="Left arrow" />
            </button>
            <div className="relative w-32 cursor-pointer">
                <label
                    onClick={(e) => e.preventDefault()}
                    className="absolute -top-2.5 flex justify-items-center items-center w-7 h-7 text-yellow2 rounded-full bg-gradient-dark font-arial text-xxs font-bold -z-10 border border-dark5 cursor-pointer"
                    style={{ left: lefPosition + "px" }}>
                    <div className="w-full text-center">{rangeValue}</div>
                </label>
                <div className="relative w-full h-2 rounded-full border-0 outline-none -z-[100] bg-dark6">
                    <div className="absolute h-2 rounded-full border-0 outline-none -z-100 bg-gradient-yellow" style={{ width: `${rangeValuePercent}%` }}></div>
                </div>
                <input
                    type="range"
                    className="range outline-none"
                    onChange={(e) => setRangeValue(parseInt(e.target.value))}
                    value={rangeValue}
                    min={minValue}
                    max={maxValue} />
            </div>
            <button
                className="w-8 outline-none active:scale-90 transform transition duration-150"
                title="Increase"
                onClick={() => setRangeValue((prevValue: number) => prevValue < maxValue ? ((prevValue + perClickValue) <= maxValue ? prevValue + perClickValue : maxValue) : prevValue)}>
                <img src="/assets/images/right-arrow.svg" alt="Left arrow" />
            </button>
        </div>
    );
};