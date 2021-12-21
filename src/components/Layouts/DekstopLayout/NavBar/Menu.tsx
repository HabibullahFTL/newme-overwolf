
import React from "react"
import { MenuItem } from "./MenuItem"


export const Menu = () => {
    return (
        <div className="col-span-5">
            <ul className="flex text-gray1 text-xl w-80 ml-10 text-center">
                <MenuItem
                    screen="mapScreen"
                    text="Map" />

                <MenuItem
                    screen="journalScreen"
                    text="Personal Journal" />
            </ul>
        </div>
    )
}
