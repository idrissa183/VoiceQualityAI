import { Link, Outlet } from "react-router";
import Navigation from "../includes/Navigation";
import Sidebar from "../includes/Sidebar";
import { useState } from "react";


const Base = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-800">
                <Navigation toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Sidebar isSidebarOpen={isSidebarOpen} />

                    <div
                        className={`fixed inset-0 z-10 ${isSidebarOpen ? '' : 'hidden'
                            } bg-gray-900/50 dark:bg-gray-900/90`}
                        id="sidebarBackdrop"
                        onClick={toggleSidebar}
                    ></div>

                    <div
                        id="main-content"
                        className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
                    >
                        <main className="flex flex-col min-h-screen">
                            <Outlet />
                        </main>

                        {/* <Footer /> */}

                        <p className="my-10 text-sm text-center text-gray-500">
                            &copy; Voice Quality AI - Développé par{' '}
                            <Link
                                to="https://idrissa.igit22.com"
                                className="hover:underline"
                                target="_blank"
                            >
                                Idrissa OUEDRAOGO
                            </Link>{' '}
                            &amp;{' '}
                            <Link
                                to="https://idrissa.igit22.com"
                                className="hover:underline"
                                target="_blank"
                            >
                                Ina PARE
                            </Link>{' '}
                            &amp;{' '}
                            <Link
                                to="https://idrissa.igit22.com"
                                className="hover:underline"
                                target="_blank"
                            >
                                Kieffer ILBOUDO
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Base;