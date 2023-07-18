import { useRouter } from "next/router";
import React from "react";

import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
    const router = useRouter();
    const { movieId } = router.query;
    const { data } = useMovie(movieId as string);
    return (
        <div className="h-screen w-screen bg-black">
            <nav className="
                fixed
                p-4
                z-10
                flex
                flex-row
                items-center
                w-full
                gap-8
                bg-black
                bg-opacity-70
            ">
                < AiOutlineArrowLeft size={30} onClick={() => router.push('/')} className="text-white cursor-pointer"/>
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light px-2">
                        Watching:
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video
            autoPlay
            controls
            className="w-full h-full"  
            src={data?.videoUrl}></video>
        </div>
    )
};

export default Watch;