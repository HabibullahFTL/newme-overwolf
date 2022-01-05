import { ButtonDataType, DesktopAppContext } from "@/contexts/DesktopAppContext";
import React, { useContext } from "react";
import { Button } from "..";
import { ButtonFilterItem } from "./ButtonFilterItem";



export const FilterBox = () => {
    const { filterData, setFilterData } = useContext(DesktopAppContext)

    return (
        <div className={`transition-all duration-200 fixed bottom-0 left-[220px] ${filterData?.active ? "h-[200px] w-[778px] z-[1005] rounded-t-xl p-4 bg-dark1 font-imfell" : "h-0 overflow-hidden"}`}>
            <h2 className="text-yellow-300 text-xl  text-center">Filters</h2>
            <div className="relative">
                <div className="h-[75px] mx-8 my-[10px] overflow-x-hidden overflow-y-auto scrollbar">
                    <div className="grid grid-cols-6 gap-2 h-full w-[663px] mr-3">
                        {
                            filterData?.filteringOptions?.filterButtons?.map((data: ButtonDataType) => <ButtonFilterItem
                                key={data.id}
                                buttonData={data}
                                filterData={filterData}
                                setFilterData={setFilterData}
                                isActive={false} />)
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button customFunc={() => { }}><span className="block text-sm px-5 font-arial font-bold">SEARCH</span></Button>
            </div>
        </div>
    );
};