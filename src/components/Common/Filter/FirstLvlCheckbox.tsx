import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import { iconNameGenerate, markerFormattedTitle } from '@/helpers/markersController';
import React, { useContext, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { RiArrowRightSFill } from 'react-icons/ri';
import SecondLvlCheckbox from './SecondLvlCheckbox';

interface SelectBoxDataType {
    checked: boolean;
    id: number,
    title: string,
    img: string
}

type Props = {
    id: number,
    title: string,
    checked: boolean,
    tracker: string[]
};

export const FirstLvlCheckbox = ({ id, title, checked, tracker }: Props) => {
    const { filterData } = useContext(DesktopAppContext)
    const [firstLvlChkBoxesData, setFirstLvlChkBoxesData] = useState<any>()
    const [secondLvlCheckBoxes, setSecondLvlCheckBoxes] = useState<any>()
    const [isOpenChild, setIsOpenChild] = useState(false)

    useEffect(() => {
        // Updating First Level Checkbox Data
        setFirstLvlChkBoxesData(filterData?.markerData[tracker[0]][tracker[1]]);
        // Updating only checkboxes title with structure
        setSecondLvlCheckBoxes(Object.keys(
            filterData?.markerData[tracker[0]][tracker[1]])
            ?.filter(name => name != "hasChildCheckbox")
            ?.map((chkboxName, index) => ({ id: index, title: chkboxName, img: null }))
        );
    }, [])

    const calculatedTitle = title?.length > 20 ? title.slice(0, 17) + "..." : title;
    console.log(firstLvlChkBoxesData);

    // const handleCheckbox = () => {
    //     setModalData(prevValue => (prevValue?.map((item) => item?.id === id ? ({ ...item, checked: !item?.checked }) : item)))
    // }
    return (
        <div
            className="grid grid-cols-12">
            <div className="col-span-10 flex items-center text-white cursor-pointer">
                <div className="w-5">
                    {
                        firstLvlChkBoxesData?.hasChildCheckbox &&
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
                            // onChange={handleCheckbox}
                            className="filter-checkbox absolute top-0 left-0 appearance-none w-[18px] h-[18px] outline-none border-2 border-white rounded" type="checkbox" />
                        <BiCheck className="absolute top-[2px] left-[2px] text-dark1" />
                    </div>
                    {markerFormattedTitle(calculatedTitle)}
                </label>
            </div>
            {
                firstLvlChkBoxesData?.hasChildCheckbox && isOpenChild &&
                <div className="col-span-12 space-y-2 mt-2">
                    {
                        secondLvlCheckBoxes?.map((chkboxData: any) => (
                            <SecondLvlCheckbox
                                key={chkboxData?.id}
                                id={chkboxData?.id}
                                img={chkboxData?.img}
                                title={chkboxData?.title}
                                checked={false}
                                tracker={[...tracker, chkboxData?.title]}
                                firstLvlChkBoxesData={firstLvlChkBoxesData} />
                        ))
                    }
                </div>
            }
            {
                !firstLvlChkBoxesData?.hasChildCheckbox &&
                firstLvlChkBoxesData &&
                iconNameGenerate(firstLvlChkBoxesData) &&
                !firstLvlChkBoxesData?.hideCheckboxIcon &&
                <div className="col-span-2">
                    <div className="w-6 h-6 overflow-hidden">
                        <img
                            className="w-full"
                            src={`/assets/images/markerIcons/${iconNameGenerate(firstLvlChkBoxesData)}.png`}
                            alt={title} />
                    </div>
                </div>
            }
        </div>
    );
};
