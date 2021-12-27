import React from 'react';
import { BiCheck } from 'react-icons/bi';

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
    setModalData: React.Dispatch<React.SetStateAction<SelectBoxDataType[]>>
};

export const FilterModalItem = ({ id, title, img, checked, setModalData }: Props) => {
    const handleCheckbox = () => {
        setModalData(prevValue => (prevValue?.map((item) => item?.id === id ? ({ ...item, checked: !item?.checked }) : item)))
    }
    const calculatedTitle = title?.length > 20 ? title.slice(0, 17) + "..." : title;
    return (
        <div
            className="grid grid-cols-12">
            <label
                className="col-span-10 text-white text-sm flex items-center cursor-pointer">
                <div className="relative inline-block w-[18px] h-[18px] mr-2 bg-dark5">
                    <input
                        checked={checked}
                        onChange={handleCheckbox}
                        className="filter-checkbox absolute top-0 left-0 appearance-none w-[18px] h-[18px] outline-none border-2 border-white rounded" type="checkbox" />
                    <BiCheck className="absolute top-0 left-[1px] text-dark1" />
                </div>
                {calculatedTitle}
            </label>
            <div className="col-span-2">
                <div className="w-6 h-6 overflow-hidden rounded-full">
                    <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt={title} />
                </div>
            </div>
        </div>
    );
};
