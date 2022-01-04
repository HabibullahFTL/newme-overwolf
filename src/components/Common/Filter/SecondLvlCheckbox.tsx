import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import { iconNameGenerate, markerFormattedTitle } from '@/helpers/markersController';
import React, { useContext, useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { RiArrowRightSFill } from 'react-icons/ri';
import ThirdLvlCheckbox from './ThirdLvlCheckbox';

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
    firstLvlChkBoxesData: any,
    setSecondLvlCheckBoxes: React.Dispatch<React.SetStateAction<CheckboxesDataType[] | undefined>>
};

const SecondLvlCheckbox = ({ id, title, checked, tracker, firstLvlChkBoxesData, setSecondLvlCheckBoxes }: Props) => {
    const { filterData, setFilterData } = useContext(DesktopAppContext)
    const [secondLvlChkBoxesData, setSecondLvlChkBoxesData] = useState<any>()
    const [thirdLvlCheckBoxes, setThirdLvlCheckBoxes] = useState<CheckboxesDataType[]>()
    const [isOpenChild, setIsOpenChild] = useState(false)

    useEffect(() => {
        // Updating Second Level Checkbox Data
        setSecondLvlChkBoxesData(firstLvlChkBoxesData[tracker[2]]);
        // Updating only checkboxes title with structure
        setThirdLvlCheckBoxes(Object.keys(
            firstLvlChkBoxesData[tracker[2]])
            ?.filter(name => name != "hasChildCheckbox")
            ?.map((chkboxName, index) => ({ id: index, title: chkboxName, checked: checked ? true : false }))
        )

        if (!firstLvlChkBoxesData[tracker[2]].hasChildCheckbox) {
            if (checked) {
                const markersData = Object.keys(firstLvlChkBoxesData[tracker[2]])?.filter(item => item != "hideCheckboxIcon")?.map(item => firstLvlChkBoxesData[tracker[2]][item]);
                setFilterData(prevValue => ({ ...prevValue, currentMarkers: [...prevValue.currentMarkers, ...markersData] }))
                console.log("2nd lvl adding");
            } else {
                const markersID = Object.keys(firstLvlChkBoxesData[tracker[2]])?.filter(item => item != "hideCheckboxIcon")?.map(item => firstLvlChkBoxesData[tracker[2]][item].id);

                setFilterData(prevValue => {
                    const markers = prevValue.currentMarkers.filter((item: any) => !markersID.includes(item.id))
                    return { ...prevValue, currentMarkers: [...markers] }
                })
                console.log("2nd lvl not adding");
            }
        }
    }, [checked])

    const calculatedTitle = title?.length > 20 ? title.slice(0, 17) + "..." : title;
    return (
        <div
            className="grid grid-cols-12">
            <div className="col-span-10 flex items-center text-white cursor-pointer">
                <div className="ml-2 w-5">
                    {
                        secondLvlChkBoxesData?.hasChildCheckbox &&
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
                            onChange={() => setSecondLvlCheckBoxes((prevValue: any) => {
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
                !secondLvlChkBoxesData?.hasChildCheckbox &&
                <div className="col-span-2">
                    <div className="w-6 h-6 overflow-hidden">
                        <img
                            className="w-full"
                            src={`/assets/images/markerIcons/${iconNameGenerate(firstLvlChkBoxesData[tracker[2]])}.png`}
                            alt={title} />
                    </div>
                </div>
            }
            <div className={`col-span-12  ${secondLvlChkBoxesData?.hasChildCheckbox && isOpenChild ? "space-y-2 mt-2 ml-2" : "h-0 overflow-hidden"}`}>
                {
                    secondLvlChkBoxesData?.hasChildCheckbox && thirdLvlCheckBoxes?.map((chkboxData: CheckboxesDataType) => (
                        <ThirdLvlCheckbox
                            key={chkboxData?.id}
                            id={chkboxData?.id}
                            title={chkboxData?.title}
                            checked={chkboxData?.checked}
                            tracker={[...tracker, chkboxData?.title]}
                            secondLvlChkBoxesData={secondLvlChkBoxesData}
                            setThirdLvlCheckBoxes={setThirdLvlCheckBoxes} />
                    ))
                }
            </div>
        </div>
    )
}

export default SecondLvlCheckbox;