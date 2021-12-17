import React from "react";

export const SidebarAd = () => {
    return (
        <div className='fixed top-32 right-16 w-28 h-420px z-[1000] cursor-pointer overflow-hidden'>
            <img className='h-full w-full object-cover' src='/assets/images/side-image-ad.png' alt='Sidebar ad' />
        </div>
    );
};