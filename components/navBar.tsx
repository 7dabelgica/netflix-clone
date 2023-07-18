import { FaBell, FaChevronCircleDown, FaSearch } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

import NavBarItem from "./navBarItem";
import MobileMenu from "./mobileMenu";
import AccountMenu from "./accountMenu";

const TOP_OFFSET = 66;

const NavBar = () => {
    const [showMobileMenu, setMobileMenu] = useState(false);
    const [showAccountMenu, setAccountMenu] = useState(false);
    const [showBackground, setBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setBackground(true);
            } else {
                setBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    }, []);

    const toogleMobileMenu = useCallback(() => {
        setMobileMenu((current) => !current);
    }, []);

    const toogleAccountMenu = useCallback(() => {
        setAccountMenu((current) => !current);
    },[]);

    return (
        <nav className="w-full fixed z-40">
            <div className={`px- 4 md:px-16 py-6 flex flex-row items-center transition duration-500
                            ${showBackground  ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo"/>
                <div className="ml-8 gap-7 hidden lg:flex flex-row">
                    <NavBarItem label="Home" />
                    <NavBarItem label="Series" />
                    <NavBarItem label="Films" />
                    <NavBarItem label="New & Popular" />
                    <NavBarItem label="My list" />
                    <NavBarItem label="Browse by languages" />
                </div>
                <div onClick={toogleMobileMenu} className="lg:hidden flex flex-row items-center ml-8 gap-2 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <FaChevronCircleDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <FaSearch/>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <FaBell/>
                    </div>
                    <div onClick={toogleAccountMenu} className="flex flex-row relative items-center gap-2 cursor-pointer">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt="profile-pic"/>
                        </div>
                        <FaChevronCircleDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'ro   tate-0'}`}/>
                        <AccountMenu visible={showAccountMenu} />
                    </div> 
                </div>
            </div>
        </nav>
    )
};

export default NavBar;