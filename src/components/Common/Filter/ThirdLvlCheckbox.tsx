import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import { iconNameGenerate, markerFormattedTitle } from '@/helpers/markersController';
import React, { useContext, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { RiArrowRightSFill } from 'react-icons/ri';

interface CheckboxesDataType {
    checked: boolean;
    id: number,
    title: string,
}

type Props = {
    id: number,
    title: string,
    checked: boolean,
    tracker: string[],
    secondLvlChkBoxesData: any,
    setThirdLvlCheckBoxes: React.Dispatch<React.SetStateAction<CheckboxesDataType[] | undefined>>
};

const ThirdLvlCheckbox = ({ id, title, checked, tracker, secondLvlChkBoxesData, setThirdLvlCheckBoxes }: Props) => {
    const { filterData, setFilterData } = useContext(DesktopAppContext)
    const [thirdLvlChkBoxesData, setThirdLvlChkBoxesData] = useState<any>()
    const [isOpenChild, setIsOpenChild] = useState(false)

    useEffect(() => {
        setThirdLvlChkBoxesData(secondLvlChkBoxesData[tracker[3]]);
    }, [])
    useEffect(() => {
        if (checked) {
            const markersData = Object.keys(secondLvlChkBoxesData[tracker[3]])?.filter(item => item != "hideCheckboxIcon")?.map(item => secondLvlChkBoxesData[tracker[3]][item]);
            setFilterData(prevValue => ({ ...prevValue, currentMarkers: [...prevValue.currentMarkers, ...markersData] }))
        } else {
            const markersID = Object.keys(secondLvlChkBoxesData[tracker[3]])?.filter(item => item != "hideCheckboxIcon")?.map(item => secondLvlChkBoxesData[tracker[3]][item].id);

            setFilterData(prevValue => {
                const markers = prevValue.currentMarkers.filter((item: any) => !markersID.includes(item.id))
                return { ...prevValue, currentMarkers: [...markers] }
            })
        }
    }, [checked])

    const calculatedTitle = title?.length > 20 ? title.slice(0, 17) + "..." : title;
    return (
        <div
            className="grid grid-cols-12">
            <div className="col-span-10 flex items-center text-white cursor-pointer">
                <div className="ml-2 w-5">
                    {
                        thirdLvlChkBoxesData?.hasChildCheckbox &&
                        <RiArrowRightSFill
                            onClick={() => setIsOpenChild(prevValue => !prevValue)}
                            className={`text-xl transform transition duration-200 ${isOpenChild ? "rotate-90" : "rotate-0"}`} />
                    }
                </div>
                <label
                    className="text-sm flex items-center cursor-pointer capitalize">
                    <div className="relative inline-block w-[18px] h-[18px] mr-2 bg-dark5">
                        <input
                            checked={checked}
                            onChange={() => setThirdLvlCheckBoxes((prevValue: any) => {
                                const tempArray = prevValue?.map((item: any) => item.id == id ? { id, title, checked: !checked } : item);
                                return tempArray
                            })}
                            className="filter-checkbox absolute top-0 left-0 appearance-none w-[18px] h-[18px] outline-none border-2 border-white rounded" type="checkbox" />
                        <BiCheck className="absolute top-[2px] left-[2px] text-dark1" />
                    </div>
                    {markerFormattedTitle(calculatedTitle)}
                </label>
            </div>
            {
                !thirdLvlChkBoxesData?.hasChildCheckbox &&
                <div className="col-span-2">
                    <div className="w-6 h-6 overflow-hidden">
                        <img
                            className="w-full"
                            src={`/assets/images/markerIcons/${iconNameGenerate(secondLvlChkBoxesData[tracker[3]])}.png`}
                            alt={title} />
                    </div>
                </div>
            }
        </div>
    )
}

export default ThirdLvlCheckbox;