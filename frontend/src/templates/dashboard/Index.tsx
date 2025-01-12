import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { FaHome, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router";
import { logoutUser } from "@/services/authentication";

const Index = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
            <div className="p-4 mx-4 bg-white block sm:flex items-center justify-between border rounded-lg border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-4 ">
                    <p className="dark:text-white">Dashboard</p>
                </div>
            </div>


        </>
    );
};

export default Index;