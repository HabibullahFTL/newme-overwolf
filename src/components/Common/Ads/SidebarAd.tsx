import { DesktopAppContext } from "@/contexts/DesktopAppContext";
import React, { useContext } from "react";

export const SidebarAd = () => {
    const { mapController } = useContext(DesktopAppContext)
    return (
        <div className='fixed top-32 right-16 w-28 h-420px z-[1000] cursor-pointer overflow-hidden' style={{ opacity: (mapController?.opacity / 100) }}>
            <img className='h-full w-full object-cover' src='/assets/images/side-image-ad.png' alt='Sidebar ad' />
        </div>
    );
};