import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Auth() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login')
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register': 'login');
    },[])
    
    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles',
            })
        } catch(e) {
            console.log(e);
        }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
            await(axios.post('/api/register', {
                email,
                name,
                password
            }))
            login();
        } catch (e) {
            console.log(e);
        }
    }, [email, name, password, login]);

    return(
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"></img>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Login' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input
                                label="Username"
                                onchange={(ev: any) => setName(ev.target.value)}
                                id="name"
                                value={name}
                                />)}
                            <Input
                                label="Email"
                                onchange={(ev: any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onchange={(ev: any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />               
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-6 text-white w-full rounded-md mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <div className="flex flex-row items-center gap-4 justify-center mt-8">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles'})}
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                            > 
                                <FcGoogle size={30}/>    
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: '/profiles'})}
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                            > 
                                <FaGithub size={30}/>    
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already has a account?'}
                            <span 
                                onClick={toggleVariant}
                                className="text-white ml-1 hover:underline cursor-pointer">
                                    {variant === 'login' ? 'Create an account' : 'Sign in'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}