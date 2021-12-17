import React from "react";

type Props = {
    children: Object,
}

export const Button = ({ children, ...rest }: Props) => {
    return (
        <button {...rest}
            className="bg-gradient-yellow py-1 2xl:py-2 px-5 rounded flex justify-center items-center" >
            {children}
        </button>
    );
};