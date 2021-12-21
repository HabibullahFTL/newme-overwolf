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

    const checkboxesData = [
        { id: 1, title: "Ironwood Tree", img: "/assets/images/icon2.png" },
        { id: 2, title: "Ironwood Tree", img: "/assets/images/icon2.png" },
        { id: 3, title: "Ironwood Tree", img: "/assets/images/icon2.png" },
        { id: 4, title: "Ironwood Tree", img: "/assets/images/icon2.png" },
        { id: 5, title: "Ironwood Tree", img: "/assets/images/icon2.png" },
        { id: 6, title: "Ironwood Tree", img: "/assets/images/icon2.png" },
        { id: 7, title: "Ironwood Tree", img: "/assets/images/icon2.png" },
    ]
    return (
        <>
            {
                filterData?.active && filterData?.activeBtn?.id === buttonData?.id && active &&
                <FilterModal
                    key={filterData?.activeBtn?.id}
                    checkboxesData={checkboxesData}
                    positions={postions}
                    handleClose={handleClose} />
            }
            <button
                onClick={(e: any) => handleClick(e)}
                className={`filter-button active:scale-95 transform transition duration-150 ${active && filterData?.activeBtn?.id === buttonData?.id && "active"}`}>
                {buttonData?.text}
            </button>
        </>
    );
};