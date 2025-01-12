import { useEffect, useState } from "react";

interface SidebarProps {
    isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const userStr = localStorage.getItem('user');
        console.log('Raw user string from localStorage:', userStr);

        if (userStr) {
            try {
                const userData = JSON.parse(userStr);
                console.log('Parsed user object:', userData);

                setUser(userData);


            } catch (error) {
                console.error("Error parsing user data:", error);
                console.error("Problematic content:", userStr);
            }
        }
    }, []);

    return (
        <>
            <aside id="sidebar"
                className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 ${isSidebarOpen ? '' : 'hidden'
                    } w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width`}
                aria-label="Sidebar">
                <div
                    className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 space-y-1 bg-white   dark:bg-gray-800">
                            <div className="divide-y divide-gray-200  dark:divide-gray-700">
                                <h2 className="text-2xl dark:text-white">Mes sessions</h2>
                                <ul className="pb-2 space-y-2">
                                    <li className="dark:text-white">
                                        session 1
                                    </li>
                                    <li className="dark:text-white">
                                        session 2
                                    </li>
                                    <li className="dark:text-white">
                                        session 3
                                    </li>
                                    <li className="dark:text-white">
                                        session 4
                                    </li>
                                    <li className="dark:text-white">
                                        session 5
                                    </li>
                                    <li className="dark:text-white">
                                        session 6
                                    </li>
                                    <li className="dark:text-white">
                                        session 7
                                    </li>
                                    <li className="dark:text-white">
                                        session 8
                                    </li>
                                    <li className="dark:text-white">
                                        session 9
                                    </li>
                                    <li className="dark:text-white">
                                        session 10
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4 sm:pb-24">
                                <ul className="pb-2 space-y-2">
                                    <li>
                                        <form action="#" className="space-y-2">
                                            <label htmlFor="session" className="text-2xl dark:text-white">Nouvelle session</label>
                                            <div className="relative">

                                                <input type="text" name="session" id="session"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Nouvelle session" />
                                            </div>
                                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Créer</button>

                                        </form>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>




                    <div className="absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800"
                        sidebar-bottom-menu>
                        <div className="mt-6 flex items-center cursor-pointer">
                            <div className="flex text-sm bg-gray-800 dark:bg-blue-700 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                                    <span className="text-gray-300">{user?.username}</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm dark:text-gray-300 whitespace-nowrap">{user?.firstname} {user?.lastname}</p>
                                <p className="text-xs text-green-400 whitespace-nowrap">Active</p>
                            </div>
                        </div>
                    </div>


                </div>
            </aside >








        </>
    );
};

export default Sidebar;