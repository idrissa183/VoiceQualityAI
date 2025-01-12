import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { FaHome, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router";
import { logoutUser } from "@/services/authentication";
import { HiMenu, HiMoon, HiSun, HiX } from 'react-icons/hi';


interface NavigationProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ toggleSidebar, isSidebarOpen }) => {
    const [dark, setDark] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle('dark');
    };

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        console.log('Raw user string from localStorage:', userStr);

        if (userStr) {
            try {
                const userData = JSON.parse(userStr);
                console.log('Parsed user object:', userData);

                setUser(userData);

                if (userData && userData.firstname && userData.lastname) {
                    toast.success(`Bienvenue ${userData.firstname} ${userData.lastname} !`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                console.error("Problematic content:", userStr);
            }
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success('Déconnexion réussie.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
            });
            setUser(null);
            await new Promise(resolve => setTimeout(resolve, 1000));

            navigate('/auth/login');
        } catch (error) {
            toast.error('Erreur lors de la déconnexion.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
            });
            console.error('Logout error:', error);
        }
    };
    return (
        <>
            <ToastContainer />
            <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button id="toggleSidebarMobile" onClick={toggleSidebar}
                                className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {isSidebarOpen ? (
                                    <HiX className="w-6 h-6" />
                                ) : (
                                    <HiMenu className="w-6 h-6" />
                                )}
                            </button>
                            <a href="/dashboard" className="flex ml-2 md:mr-24">

                                <span
                                    className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Voice Quality AI</span>
                            </a>

                        </div>
                        <div className="flex items-center">
                            

                            <button
                                id="theme-toggle"
                                data-tooltip-target="tooltip-toggle"
                                onClick={darkModeHandler}
                                type="button"
                                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                            >
                                {dark && <HiSun className="w-5 h-5" />}
                                {!dark && <HiMoon className="w-5 h-5" />}
                            </button>

                            <div
                                id="tooltip-toggle"
                                role="tooltip"
                                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
                            >
                                {dark ? 'Light mode' : 'Dark mode'}
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>

                            <div className="flex items-center ml-3">
                                <div>
                                    <button type="button"
                                        className="flex text-sm bg-gray-800 dark:bg-blue-700 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        id="user-menu-button-2" aria-expanded="false" data-dropdown-toggle="dropdown-2">
                                        <span className="sr-only">Open user menu</span>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                            <span className="text-gray-300">{user?.username}</span>
                                        </div>
                                    </button>
                                </div>

                                <div
                                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-200 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="dropdown-2">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            {user?.lastname} {user?.firstname}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="/dashboard"
                                                className="flex items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"><FaHome className="h-4 w-4 mr-2 " />Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white "
                                                role="menuitem"><FaUserCog className="h-4 w-4 mr-2 " />Profil</a>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                                role="menuitem"
                                            >
                                                <FaSignOutAlt className="h-4 w-4 mr-2" />
                                                Se déconnecter
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navigation;