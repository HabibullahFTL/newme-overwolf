import { DesktopAppContext } from "@/contexts/DesktopAppContext";
import { callbackOAuth } from "@/helpers/auth";
import React, { useContext, useEffect, useState } from "react";
import { FilterButton } from "./FilterButton";
import { LoginModal } from "./LoginModal";
import { Menu } from "./Menu";
import { SearchBox } from "./SearchBox";

export const NavBar = () => {
    const [showModal, setShowModal] = useState(false)
    const { userData } = useContext(DesktopAppContext)

    useEffect(() => {
        overwolf.extensions.onAppLaunchTriggered.addListener(callbackOAuth);
    }, [])
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
            <Menu />

            {/* Search box */}
            <SearchBox />

            {/* Filtering button  */}
            <FilterButton />

            {/* Profile Image  */}
            <div className="col-span-1 relative flex justify-end items-center">
                <div
                    onClick={() => setShowModal(prevValue => !prevValue)}
                    className="h-9 w-9 overflow-hidden rounded-full mr-10 border border-white cursor-pointer">
                    <img
                        className="w-full h-full object-cover"
                        src="/assets/images/Ellipse 3.png"
                        alt="" />
                </div>
                {
                    showModal &&
                    <LoginModal
                        userData={userData} />
                }
            </div>
        </nav>
    )
}