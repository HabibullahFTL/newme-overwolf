import React from "react";
import { NavBar } from "./NavBar/NavBar";

type Props = {
    children: Object | string | string[] | JSX.Element | JSX.Element[]
};

export const DesktopLayout = ({ children }: Props) => {
    return (
        <div
            className="mainWrapper overflow-hidden font-imfell">
            <NavBar />
            <main className="childrenWrapper py-3 px-10">
                <div className="h-full bg-dark3 rounded-lg overflow-auto scrollbar-hidden">
                    {children}
                </div>
            </main>
        </div>
    )
}