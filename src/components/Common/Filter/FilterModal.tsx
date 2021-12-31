import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import React, { useContext, useEffect, useState } from 'react';
import { FirstLvlCheckbox } from './FirstLvlCheckbox';


interface SelectBoxDataType {
    checked: boolean;
    id: number,
    title: string,
}

interface CheckboxesDataType {
    id: number,
    title: string,
}

interface PositionsType {
    top: number,
    left: number,
}

type Props = {
    positions: PositionsType,
    handleClose: () => void,
    tracker: string[],
};

export const FilterModal = ({ positions = { top: 0, left: 0 }, handleClose, tracker }: Props) => {
    const [modalData, setModalData] = useState<SelectBoxDataType[]>([] as SelectBoxDataType[])
    const { filterData, setFilterData } = useContext(DesktopAppContext)

    const keys = Object.keys(filterData?.markerData?.[tracker[0]]);
    const checkboxesData = keys.map((item, index) => ({ id: index, title: item }));

    useEffect(() => {
        setModalData(keys.map((item, index) => ({ id: index, title: item, checked: false }))?.filter(data => data?.title != "hasChildCheckbox"))
    }, [])

    const handleSelectAll = () => { setModalData(prevValue => prevValue?.map((obj) => ({ ...obj, checked: true }))); }
    const handleDeselectAll = () => { setModalData(prevValue => prevValue?.map((obj) => ({ ...obj, checked: false }))); }
    return (
        <div className={`absolute bottom-[${positions?.top === 0 ? 70 : 25}px] left-[${positions?.left + 85}px] z-[1020] w-[285px] h-[300px] bg-dark1 border border-gray-700 font-arial rounded px-4 py-3`}>
            <div className="flex justify-between text-yellow-300">
                <button
                    onClick={handleSelectAll}>Select All</button>
                <button
                    onClick={handleDeselectAll}>Deselect All</button>
            </div>
            <div className="mt-3 overflow-y-auto h-[205px] space-y-2 scrollbar">
                {
                    modalData?.map((item: SelectBoxDataType) => {
                        return <FirstLvlCheckbox
                            key={item?.id}
                            id={item?.id}
                            title={item?.title}
                            checked={item?.checked ? true : false}
                            tracker={[...tracker, item?.title]} />
                    })
                }
            </div>
            <div className="flex justify-end text-yellow-300 mt-3">
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};