import { Button } from '@/components/Common';
import { DesktopAppContext } from '@/contexts/DesktopAppContext';
import React, { useContext } from 'react';

export const FilterButton = () => {
    const { filterData, setFilterData } = useContext(DesktopAppContext)
    return (
        <div className="col-span-2 py-3 flex justify-center">
            <Button
                customFunc={() => setFilterData({ ...filterData, active: !filterData.active })}
            >
                Filter
                <img
                    className="ml-2"
                    src="/assets/images/mono-icons_filter.svg"
                    alt="Filter" />
            </Button>
        </div>
    );
};
