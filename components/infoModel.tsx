import React, { useCallback, useEffect, useState } from "react";

import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import FavoritesButton from "./favoritesButton";
import { IoMdClose } from "react-icons/io";
import PlayButton from "./playButton";

interface infoModelProps {
    visible?: boolean,
    onClose: any,
};

const InfoModel: React.FC<infoModelProps> = ({visible, onClose}) => {
    const [isVisible, setIsVisible] = useState(!!visible);

    const { movieId } = useInfoModal();
    const { data = {} } = useMovie(movieId);

    useEffect(() => {
        setIsVisible(!!visible)
    },[visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose()
        }, 300);
    }, [onClose]);

    if(!visible) {
        return null;
    }

    return (
        <div 
            className="
                z-50
                transition
                flex
                items-center
                justify-center
                bg-black
                bg-opacity-80
                duration-300
                overflow-x-hidden
                overflow-y-auto
                inset-0
                fixed
                "
            >
                <div 
                    className="
                    mx-auto
                    overflow-hidden
                    relative
                    w-auto
                    max-w-3xl
                    rounded-md
                    "
                >
                    <div 
                        className={`
                            ${isVisible ? 'scale-100' : 'scale-0'}
                            transform
                            duration-300
                            relative
                            flex-auto
                            bg-zinc-900
                            drop-shadow-md
                        `}
                    >
                        <div className="relative h-96">
                            <video 
                                className="
                                    w-full
                                    h-full
                                    brightness-[60%]
                                    object-cover
                                "
                                autoPlay
                                loop
                                muted
                                poster={data?.thumbnailUrl}
                                src={data?.videoUrl}>
                            </video>
                            <div
                                onClick={handleClose}
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    bg-black
                                    bg-opacity-70
                                    absolute
                                    rounded-full
                                    top-3
                                    right-3
                                    h-10
                                    w-10
                                    cursor-pointer
                                "
                            >
                                <IoMdClose className="text-white" size={20} />
                            </div>
                            <div className="absolute bottom-[10%] left-10">
                                <p className="text-white text-3xl md:text-4xl lg:text-5xl font-bold h-full mb-8">
                                    {data?.title}
                                </p>
                                <div className="flex flex-row gap-4 items-center">
                                    <PlayButton movieId={data?.id}/>
                                    <FavoritesButton movieId={data?.id} />
                                </div>
                            </div>
                        </div>
                        <div className="px-12 py-8">
                            <p className="text-green-400 font-bold text-lg">
                                New
                            </p>
                            <p className="text-white text-lg">
                                {data?.duration}
                            </p>
                            <p className="text-white text-lg">
                                {data?.genre}
                            </p>
                            <p className="text-white text-lg">
                                {data?.description}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default InfoModel;