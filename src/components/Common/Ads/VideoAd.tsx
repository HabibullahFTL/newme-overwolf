import React from "react";

export const VideoAd = () => {
    return (
        <div className='fixed top-32 left-16 w-60 h-48 z-[1000] cursor-pointer overflow-hidden'>
            <img className='h-full w-full object-cover' src='/assets/images/video-ad.png' alt='Video ad' />
        </div>
    );
};