import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useRouter from "next/router";

export async function GetSideServerProps(context: NextPageContext) {
    const session = await getSession(context);

    if(!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const Profiles = () => {
    const { data: user } = useCurrentUser();
    const router = useRouter;

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-white text-3xl md:text-6xl text-center">Who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        <div className="group mx-auto w-44 flex-row">
                            <div className="w-44 h-44 items-center justify-center rounded md flex border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="/images/default-red.png" alt="Profile"></img>
                            </div>
                            <div className="text-2xl text-gray-400 text-center mt-4 group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profiles;