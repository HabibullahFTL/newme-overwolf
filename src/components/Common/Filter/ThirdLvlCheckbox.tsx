import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import { iconNameGenerate, markerFormattedTitle } from '@/helpers/markersController';
import React, { useContext, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { RiArrowRightSFill } from 'react-icons/ri';

interface SelectBoxDataType {
    checked: boolean;
    id: number,
    title: string,
    img: string
}

type Props = {
    id: number,
    title: string,
    img: string,
    checked: boolean,
    tracker: string[],
    secondLvlChkBoxesData: any
};

const ThirdLvlCheckbox = ({ id, title, img, checked, tracker, secondLvlChkBoxesData }: Props) => {
    const { filterData } = useContext(DesktopAppContext)
    const [thirdLvlChkBoxesData, setThirdLvlChkBoxesData] = useState<any>()
    const [isOpenChild, setIsOpenChild] = useState(false)

    useEffect(() => {
        setThirdLvlChkBoxesData(secondLvlChkBoxesData[tracker[3]]);
    }, [])

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
                            className="filter-checkbox absolute top-0 left-0 appearance-none w-[18px] h-[18px] outline-none border-2 border-white rounded" type="checkbox" />
                        <BiCheck className="absolute top-[2px] left-[2px] text-dark1" />
                    </div>
                    {markerFormattedTitle(calculatedTitle)}
                </label>
            </div>
            {
                secondLvlChkBoxesData?.hasChildCheckbox && isOpenChild &&
                <div className="col-span-12">

                </div>
            }
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