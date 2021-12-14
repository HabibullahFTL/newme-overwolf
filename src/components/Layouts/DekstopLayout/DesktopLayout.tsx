import React from "react";
import { NavBar } from "./NavBar/NavBar";

type Props = {
    children: Object | string | string[] | JSX.Element | JSX.Element[],
};

export const DesktopLayout = ({ children }: Props) => {
    return (
        <div className="w-full h-full" style={{ background: "#17161A" }}>
            <NavBar />
            <main>
                {children}
            </main>
        </div>
    )
}