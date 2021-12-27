import { ButtonDataType, FilterDataType, SetFilterDataType } from '@/contexts/DesktopAppContext';
import React, { useState } from 'react';
import { FilterModal } from './FilterModal';

type Props = {
    buttonData: ButtonDataType,
    filterData: FilterDataType,
    setFilterData: SetFilterDataType,
    isActive: boolean
};

export const ButtonFilterItem = ({ buttonData, filterData = {} as FilterDataType, setFilterData, isActive = false }: Props) => {
    const [active, setActive] = useState(isActive);
    const [postions, setPostions] = useState({ top: 0, left: 0 })

    const handleClick = (e: any) => {
        setActive(true);
        setPostions({
            top: e.target?.offsetTop,
            left: e.target?.offsetLeft
        })
        setFilterData({ ...filterData, activeBtn: buttonData })
    }

    const handleClose = () => {
        setActive(false);
        setFilterData({ ...filterData, activeBtn: null })
    }

    const filterSecondLvlData = filterData?.markerData?.[buttonData?.text];
    const keys = Object.keys(filterSecondLvlData);
    const btnsData = keys.map((item, index) => ({ id: index, title: item, img: "/assets/images/icon2.png" }))
    return (
        <>
            {
                filterData?.active && filterData?.activeBtn?.id === buttonData?.id && active &&
                <FilterModal
                    key={filterData?.activeBtn?.id}
                    checkboxesData={btnsData}
                    positions={postions}
                    handleClose={handleClose}
                    filterSecondLvlData={filterSecondLvlData} />
            }
            <button
                onClick={(e: any) => handleClick(e)}
                className={`filter-button capitalize active:scale-95 transform transition duration-150 ${active && filterData?.activeBtn?.id === buttonData?.id && "active"}`}>
                {buttonData?.text}
            </button>
        </>
    );
};