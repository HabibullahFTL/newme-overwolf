import React from 'react';
import { MenuItem } from "./MenuItem";

export const TopMenu = () => {
    return (
        <div className="col-span-5">
            <ul className="flex text-gray1 text-xl w-80 ml-10 text-center">
                <MenuItem
                    to={"/"}
                    text="Map" />

                <MenuItem
                    to={"/journal"}
                    text="Personal Journal" />
            </ul>
        </div>
    );
};