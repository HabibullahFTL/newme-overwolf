import { DesktopAppContext } from "@/contexts/DesktopAppContext";
import React, { useContext } from "react";

export const VideoAd = () => {
    const { mapController } = useContext(DesktopAppContext)
    return (
        <div className='fixed top-32 left-16 w-60 h-48 z-[1000] cursor-pointer overflow-hidden' style={{ opacity: (mapController?.opacity / 100) }}>
            <img className='h-full w-full object-cover' src='/assets/images/video-ad.png' alt='Video ad' />
        </div>
    );
};