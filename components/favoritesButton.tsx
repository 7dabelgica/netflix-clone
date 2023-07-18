import axios from "axios";
import React, { useCallback, useMemo } from "react";

import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoritesIdProps {
    movieId: string,
};

const FavoritesButton: React.FC<FavoritesIdProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId)
    }, [currentUser, movieId]);
    const toogleFavorites = useCallback(async () => {
        let response;
        if(isFavorite) {
            response = await axios.delete(`/api/favorite?movieId=${movieId}`);
        } else {
            response = await axios.post('/api/favorite', { movieId });
        }

        const updateFavoritesIds = response?.data?.favoriteIds;
        mutate ({
            ...currentUser,
            favoriteIds: updateFavoritesIds,
        });

        mutateFavorites();
    }, [isFavorite, movieId, mutate, mutateFavorites, currentUser]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div 
        onClick={toogleFavorites}
        className="
        cursor-pointer
        border-2
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        transition
        flex
        items-center
        justify-center
        hover:bg-neutral-500
        bg-white
        rounded-full
        "
        >
            <Icon size={25}/>
        </div>
    )
};

export default FavoritesButton;