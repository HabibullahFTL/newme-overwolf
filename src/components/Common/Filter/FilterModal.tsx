import React, { useEffect, useState } from 'react';
import { FilterModalItem } from './FilterModalItem';


interface SelectBoxDataType {
    checked: boolean;
    id: number,
    title: string,
    img: string
}

interface CheckboxesDataType {
    id: number,
    title: string,
    img: string
}

interface PositionsType {
    top: number,
    left: number,
}

type Props = {
    checkboxesData: CheckboxesDataType[],
    positions: PositionsType,
    handleClose: () => void
};

export const FilterModal = ({ checkboxesData = [], positions = { top: 0, left: 0 }, handleClose }: Props) => {
    const [modalData, setModalData] = useState<SelectBoxDataType[]>([] as SelectBoxDataType[])

    useEffect(() => {
        setModalData(checkboxesData?.map(item => ({ ...item, checked: false })))
    }, [checkboxesData])

    const handleSelectAll = () => { setModalData(prevValue => prevValue?.map((obj) => ({ ...obj, checked: true }))); }
    const handleDeselectAll = () => { setModalData(prevValue => prevValue?.map((obj) => ({ ...obj, checked: false }))); }
    return (
        <div className={`absolute bottom-[${positions?.top === 0 ? 70 : 25}px] left-[${positions?.left + 85}px] z-[1020] w-[230px] min-h-[140px] max-h-[300px] bg-dark1 border border-gray-700 font-arial rounded px-4 py-3`}>
            <div className="flex justify-between text-yellow-300">
                <button
                    onClick={handleSelectAll}>Select All</button>
                <button
                    onClick={handleDeselectAll}>Deselect All</button>
            </div>
            <div className="mt-3 overflow-y-auto max-h-[180px] scrollbar">
                {/* {
                    modalData?.map(item => <div key={item?.id}>
                        <input type="checkbox" onChange={() => handleCheckboxChange(item?.id)} checked={item?.checked} />
                    </div>)
                } */}
                {
                    modalData?.map((item: SelectBoxDataType) => {
                        return <FilterModalItem
                            key={item?.id}
                            id={item?.id}
                            img={item?.img}
                            title={item?.title}
                            checked={item?.checked ? true : false}
                            setModalData={setModalData} />
                    })
                    ?? <h2>Not found</h2>
                }
            </div>
            <div className="flex justify-end text-yellow-300 mt-3">
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};