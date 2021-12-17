import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import classes from './Menu.module.css';

type Props = {
    to: string,
    text: string,
};

export const MenuItem = ({ to, text }: Props) => {
    const [isActive, setIsActive] = useState<Boolean>(false)

    // const location = useLocation()
    useEffect(() => {
        if (to === "/") {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [to])


    return (
        <li>
            <a
                className={`block px-6 py-3 ${isActive ? "text-yellow-300 border-b-[3px] border-yellow-300" : "border-b-[3px] border-dark2"}`}
                href={to}
            >{text}</a>
        </li>
    );
};