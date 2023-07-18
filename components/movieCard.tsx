import React from "react";

import { BsPlayFill } from 'react-icons/bs';
import FavoritesButton from './favoritesButton';
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
import { BiChevronDown } from "react-icons/bi";

interface MovieCardProps {
    data: Record<string, any>,
}

const MovieCard: React.FC<MovieCardProps> = ({
    data
}) => {
    const router = useRouter();
    const { openModal } = useInfoModal();
    
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img className="
                cursor-pointer
                shadow-xl
                rounded-md
                object-cover
                transition
                duration
                group-hover:opacity-90
                sm:group-hover:opacity-0
                delay-300
                w-full
                h-[12vw]
            "
            src={data.thumbnailUrl} alt="Thumbnail" />
            <div className="
                opacity-0
                transition
                duration-200
                delay-300
                absolute
                top-0
                z-10
                invisible
                sm:visible
                w-full
                scale-0
                group-hover:opacity-100
                group-hover:-translate-y-[6vw]
                group-hover:translate-x-[2vw]
                group-hover:scale-110
            "
            >
                <img className="
                    cursor-pointer
                    transition
                    duration
                    shadow-xl
                    rounded-t-md
                    w-full
                    h-[12vw]
                    object-cover
                "
                src={data.thumbnailUrl} alt="Thumbnail"/>
                <div className="
                    z-10
                    p-2 lg:p-4
                    rounded-b-md
                    shadow-xl
                    absolute
                    transition
                    w-full
                    bg-zinc-800
                ">
                    <div className="flex flex-row items-center gap-3">
                        <div className="
                            cursor-pointer
                            w-6 lg:w-10
                            h-6 lg:h-10
                            flex
                            justify-center
                            items-center
                            rounded-full
                            bg-white
                            hover:bg-neutral-500
                            transition
                            border-2
                        "
                            onClick={() => router.push(`/watch/${data?.id}`)}
                        >
                            <BsPlayFill size={30}/>
                        </div>
                        <FavoritesButton movieId={data.id} />
                        <div
                        onClick={() => openModal(data?.id)} 
                        className="
                            cursor-pointer
                            ml-auto
                            group/item
                            border-white
                            border-2
                            rounded-full
                            h-6 lg:h-10
                            w-6 lg:w-10
                            flex
                            items-center
                            justify-center
                            hover:border-neutral-300
                        ">
                            <BiChevronDown 
                                size={30}
                                className="text-white group-hover/items:text-neutral-300"/> 
                        </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row items-center mt-4 gap-2">
                        <p className="text-white text-[10px] lg:text-sm">
                            {data.duration}
                        </p>
                    </div>
                    <div className="flex flex-row items-center mt-4 gap-2">
                        <p className="text-white text-[10px] lg:text-sm">
                            {data.genre}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MovieCard;