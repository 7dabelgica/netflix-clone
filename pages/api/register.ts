import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import prismadb from '../../lib/prismadb';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;

        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        if(existingUser) {
            return res.status(422).json({error: 'Email already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                emailVerified: new Date(),
                hashedPassword,
                name,
                image: '',

            }
        });

        return res.status(200).json(user);
    } catch(e) {
        return res.status(400).json({ error:`Something went wrong: ${e}`});
    }
}