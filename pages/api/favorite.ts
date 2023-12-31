import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id:movieId
                },
            });
    
            if(!existingMovie) {
                throw new Error('Id invalid');
            }
    
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    },
                },
            });
    
            return res.status(200).json(user);
        }
    
        if(req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);
            const { movieId } = req.query as {movieId: string};
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                },
            });
    
            if(!existingMovie) {
                throw new Error('Id invalid');
            }
    
            const updateFavoritesId = without(currentUser.favoriteIds, movieId);
    
            const userUpdate = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updateFavoritesId,
                },
            });
    
            return res.status(200).json(userUpdate)
        }
        return res.status(200).end()
    } catch(e) {
        console.log(e);
        return res.status(500).end()
    }
}