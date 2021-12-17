import React from "react";
import { FilterButton } from "./FilterButton";
import { MenuItem } from "./MenuItem";
import { SearchBox } from "./SearchBox";

export const NavBar = () => {
    return (
        <nav className="h-14 bg-dark2 grid grid-cols-12">
            {/* For Logo  */}
            <div className="h-full w-full flex  items-center pl-5">
                <div className="w-10 h-10">
                    <img
                        className="w-full h-full object-cover"
                        src="/assets/images/logo.svg"
                        alt="Logo" />
                </div>
            </div>

            {/* For Menu  */}
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

            {/* Search box */}
            <SearchBox />

            {/* Filtering button  */}
            <FilterButton />

            {/* Profile Image  */}
            <div className="col-span-1 flex justify-end items-center">
                <div className="h-9 w-9 overflow-hidden rounded-full mr-10 border border-white">
                    <img
                        className="w-full h-full object-cover"
                        src="/assets/images/Ellipse 3.png"
                        alt="" />
                </div>
            </div>
        </nav>
    )
}