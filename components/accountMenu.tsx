import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
    visible?: boolean
};

const AccountMenu:React.FC<AccountMenuProps> = ({
    visible,
}) => {
    const { data } = useCurrentUser();
    if(!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="flex flex-row px-3 group/items w-full items-center"> 
                    <img className="w-8 rounded-md" src="/images/default-red.png" alt="profile-pic"/>
                    <p className="text-white text-sm group-hover/items:text-gray-300 pl-5">
                        {data?.name}
                    </p>
                </div>
                <hr className="bg-gray-600 h-px my-4 border-0"/>
                <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:text-gray-300">
                    Sign out of Netflix
                </div>
            </div>
        </div>
    )
};

export default AccountMenu;