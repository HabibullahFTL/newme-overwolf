import { DesktopAppContext } from "@/contexts/DesktopAppContext";
import React, { useContext, useEffect, useState } from 'react';

type Props = {
    text: string,
    screen: string,
};

export const MenuItem = ({ text, screen }: Props) => {
    const [isActive, setIsActive] = useState<Boolean>(false)

    const { menuData, setMenuData } = useContext(DesktopAppContext);

    useEffect(() => {
        if (screen === menuData?.active) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [screen, menuData])


    return (
        <li>
            <button
                onClick={() => setMenuData({ ...menuData, active: screen })}
                className={`block px-6 py-3 ${isActive ? "text-yellow-300 border-b-[3px] border-yellow-300" : "border-b-[3px] border-dark2"}`}
            >{text}</button>
        </li>
    );
};