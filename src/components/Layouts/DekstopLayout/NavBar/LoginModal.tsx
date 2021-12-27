
import { UserDataType } from "@/contexts/DesktopAppContext"
import { onLogin } from "@/helpers/auth"
import React from "react"
import { BiLogIn, BiLogOut } from "react-icons/bi"

type Props = {
    userData: UserDataType
}

export const LoginModal = ({ userData }: Props) => {
    return (
        <div className="absolute top-[55px] right-[40px] z-[1050] min-w-[120px] bg-dark1 border border-gray-600 rounded p-2">
            {
                userData?.isLoggedIn
                    ? <button
                        className="flex items-center w-full text-gray-500 text-left border-b border-gray-600 pt-1">
                        <BiLogOut className="mr-1" /> Log out
                    </button>
                    : <button
                        onClick={onLogin}
                        className="flex items-center w-full text-gray-500 text-left border-b border-gray-600 pt-1">
                        <BiLogIn className="mr-1" /> Login
                    </button>
            }


        </div>
    )
}
