import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import {BiSolidInfoCircle} from 'react-icons/bi';
import PlayButton from "./playButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
    const { data } = useBillboard();
    const { openModal } = useInfoModal();

    const handleOpenModel = useCallback(() => {
        openModal(data?.id);
    },[openModal, data?.id]);

    return (
        <div className="relative h-[56.25vw]">
            <video
            className="w-full h-[56.25vw] object-cover brightness-[60%]"
            autoPlay
            muted
            loop
            src={data?.videoUrl}
            poster={data?.thumbnailUrl}
            >

            </video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-1xl md:text-5xl h-full h-[50%] font-bold lg:text-6xl drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg w-[90%] md:w-[80%] lg:text[50%] mt-3 md:mt-8 drop-shadow-xl">
                    {data?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={data?.id} />
                    <button
                        onClick={handleOpenModel}
                        className="
                            text-white
                            bg-white
                            bg-opacity-30 
                            rounded-md 
                            py-1 md:py-2 
                            px-2 md:px-4
                            text-xs lg:text-lg
                            font-semibold
                            flex
                            flex-row
                            items-center
                            hover:bg-opacity-20
                            transition
                            ">
                        <BiSolidInfoCircle className="mr-1"/>
                        More info
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Billboard;