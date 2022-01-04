import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import { iconNameGenerate, markerFormattedTitle } from '@/helpers/markersController';
import React, { useContext, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { RiArrowRightSFill } from 'react-icons/ri';
import SecondLvlCheckbox from './SecondLvlCheckbox';

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
    modalData: any,
    setFirstLvlCheckBoxes: React.Dispatch<React.SetStateAction<CheckboxesDataType[]>>
};

export const FirstLvlCheckbox = ({ id, title, checked, tracker, modalData, setFirstLvlCheckBoxes }: Props) => {
    const { filterData, setFilterData } = useContext(DesktopAppContext)
    const [firstLvlChkBoxesData, setFirstLvlChkBoxesData] = useState<any>()
    const [secondLvlCheckBoxes, setSecondLvlCheckBoxes] = useState<CheckboxesDataType[]>()
    const [isOpenChild, setIsOpenChild] = useState(false)


    useEffect(() => {
        // Updating First Level Checkbox Data
        setFirstLvlChkBoxesData(modalData[tracker[1]]);
        // Updating only checkboxes title with structure
        setSecondLvlCheckBoxes(Object.keys(
            modalData[tracker[1]])
            ?.filter(name => name != "hasChildCheckbox")
            ?.map((chkboxName, index) => ({ id: index, title: chkboxName, checked: checked ? true : false }))
        );

        if (!modalData[tracker[1]].hasChildCheckbox) {
            if (checked) {
                const markersData = Object.keys(modalData[tracker[1]])?.filter(item => item != "hideCheckboxIcon")?.map(item => modalData[tracker[1]][item]);
                setFilterData(prevValue => ({ ...prevValue, currentMarkers: [...prevValue.currentMarkers, ...markersData] }))
                console.log("First lvl adding");

            } else {
                const markersID = Object.keys(modalData[tracker[1]])?.filter(item => item != "hideCheckboxIcon")?.map(item => modalData[tracker[1]][item].id);

                setFilterData(prevValue => {
                    const markers = prevValue.currentMarkers.filter((item: any) => !markersID.includes(item.id))
                    return { ...prevValue, currentMarkers: [...markers] }
                })
                console.log("First lvl not adding");
            }
        }
    }, [checked])

    const calculatedTitle = title?.length > 20 ? title.slice(0, 17) + "..." : title;


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
                            onChange={() => setFirstLvlCheckBoxes((prevValue: any) => {
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
            <div className={`col-span-12  ${firstLvlChkBoxesData?.hasChildCheckbox && isOpenChild ? "space-y-2 mt-2" : "h-0 overflow-hidden"}`}>
                {
                    firstLvlChkBoxesData?.hasChildCheckbox && secondLvlCheckBoxes?.map((chkboxData: CheckboxesDataType) => (
                        <SecondLvlCheckbox
                            key={chkboxData?.id}
                            id={chkboxData?.id}
                            title={chkboxData?.title}
                            checked={chkboxData?.checked}
                            tracker={[...tracker, chkboxData?.title]}
                            firstLvlChkBoxesData={firstLvlChkBoxesData}
                            setSecondLvlCheckBoxes={setSecondLvlCheckBoxes} />
                    ))
                }
            </div>
        </div>
    );
};
