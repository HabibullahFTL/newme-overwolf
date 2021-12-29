import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import React, { useContext, useEffect, useState } from 'react';
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
    handleClose: () => void,
    filterSecondLvlData: any
};

export const FilterModal = ({ checkboxesData = [], positions = { top: 0, left: 0 }, handleClose, filterSecondLvlData }: Props) => {
    const [modalData, setModalData] = useState<SelectBoxDataType[]>([] as SelectBoxDataType[])
    const { filterData, setFilterData } = useContext(DesktopAppContext)

    useEffect(() => {
        setModalData(checkboxesData?.filter(data => data?.title != "hasChild")?.map(item => ({ ...item, checked: false })))
        // const {currentMarkers} = filterData;
        // const keys = Object.keys(currentMarkers);
        // keys?.filter((item)=>{
        //     const modalDataKeys = modalData?.map(item=>item.title);
        //     if (item == modalDataKeys[item]) {

        //     }
        // });

        // currentMarkers?.filter((item)=>())
        // setFilterData((prevValue)=>({...prevValue,currentMarkers: {...prevValue?.currentMarkers,}}))
    }, [checkboxesData])

    const handleSelectAll = () => { setModalData(prevValue => prevValue?.map((obj) => ({ ...obj, checked: true }))); }
    const handleDeselectAll = () => { setModalData(prevValue => prevValue?.map((obj) => ({ ...obj, checked: false }))); }
    return (
        <div className={`absolute bottom-[${positions?.top === 0 ? 70 : 25}px] left-[${positions?.left + 85}px] z-[1020] min-w-[220px] max-w-[255px] min-h-[140px] max-h-[300px] bg-dark1 border border-gray-700 font-arial rounded px-4 py-3`}>
            <div className="flex justify-between text-yellow-300">
                <button
                    onClick={handleSelectAll}>Select All</button>
                <button
                    onClick={handleDeselectAll}>Deselect All</button>
            </div>
            <div className="mt-3 overflow-y-auto max-h-[180px] space-y-2 scrollbar">
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