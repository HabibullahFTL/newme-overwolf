import { Button } from '@/components/Common';
import React from 'react';

export const FilterButton = () => {
    return (
        <div className="col-span-2 py-3 flex justify-center">
            <Button>
                Filter
                <img
                    className="ml-2"
                    src="/assets/images/mono-icons_filter.svg"
                    alt="Filter" />
            </Button>
        </div>
    );
};
