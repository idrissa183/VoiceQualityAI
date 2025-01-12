import { Link, Outlet } from "react-router";
import Starter from "../pages/Starter";

const BaseStarter = () => {
    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-800">
                <Starter />

                <div
                    id="main-content"
                    className="relative w-full h-full overflow-y-auto bg-gray-50  dark:bg-gray-900"
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
        </>
    );
};

export default BaseStarter;