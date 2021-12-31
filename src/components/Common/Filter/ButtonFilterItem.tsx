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
    const tracker = [buttonData?.text];

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

    return (
        <>
            {
                filterData?.active && filterData?.activeBtn?.id === buttonData?.id && active &&
                <FilterModal
                    key={filterData?.activeBtn?.id}
                    positions={postions}
                    handleClose={handleClose}
                    tracker={tracker} />
            }
            <button
                onClick={(e: any) => handleClick(e)}
                className={`filter-button capitalize active:scale-95 transform transition duration-150 ${active && filterData?.activeBtn?.id === buttonData?.id && "active"}`}>
                {buttonData?.text}
            </button>
        </>
    );
};