import { useRouter } from "next/router";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface playButtonProps {
    movieId: string,
};

const PlayButton: React.FC<playButtonProps> = ({ movieId }) => {
    const router = useRouter();
    
    return (
        <button 
        onClick={() => router.push(`/watch/${movieId}`)}
        className="
            bg-white
            flex
            flex-row
            items-center
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            hover:bg-neutral-300
            transition
            font-semibold
            text-ms lg:text-lg
            w-auto
        ">
            <BsFillPlayFill size={30} className="mr-1"/>
            Play
        </button>
    )
};

export default PlayButton;