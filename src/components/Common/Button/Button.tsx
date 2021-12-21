import React from "react";

type Props = {
    children: Object,
    customFunc: () => void | React.Dispatch<React.SetStateAction<any>>;
}

export const Button = ({ children, customFunc }: Props) => {
    return (
        <button
            onClick={customFunc}
            className="bg-gradient-yellow py-1 2xl:py-2 px-5 rounded flex justify-center items-center  active:scale-95 transform transition duration-150" >
            {children}
        </button>
    );
};