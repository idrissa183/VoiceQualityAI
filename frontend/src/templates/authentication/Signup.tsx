import { Label, TextInput } from "flowbite-react";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { useState } from "react";
import { registerUser } from "@/services/authentication";



const Signup = () => {

    const { type, isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            const userData = {
                firstname,
                lastname,
                email,
                password
            };

            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await registerUser(userData);
            setSuccess(response.message);
            setTimeout(() => {
                window.location.href = '/auth/login';
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.detail || "Une erreur est survenue lors de l'inscription");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">

                <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        S'inscrire
                    </h2>
                    {error && (
                        <p className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                            {success}
                        </p>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lastname" value="Nom" />
                            </div>
                            <TextInput id="lastname" icon={FiUser} type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="firstname" value="Prénom" />
                            </div>
                            <TextInput id="firstname" icon={FiUser} value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} addon="@" type="email" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <RiLockPasswordLine className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </span>
                                <div className="relative w-full">
                                    <input type={type} onChange={(e) => setPassword(e.target.value)} value={password} id="password" name="password" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                                    <button type="button" onClick={togglePasswordVisibility} id="show_password" className="absolute top-0 right-0 p-2.5 h-full text-sm font-thin text-white rounded-r-lg">
                                        <span className="sr-only">
                                            {isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                        </span>
                                        {isPasswordVisible ? (
                                            <IoEyeOffOutline className="w-6 h-6 text-gray-800 dark:text-white" />
                                        ) : (
                                            <IoEyeOutline className="w-6 h-6 text-gray-800 dark:text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmez mot de passe</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <RiLockPasswordLine className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </span>
                                <div className="relative w-full">
                                    <input type={type} id="confirm_password" name="confirm_password" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                                    <button type="button" onClick={togglePasswordVisibility} id="show_confirm_password" className="absolute top-0 right-0 p-2.5 h-full text-sm font-thin text-white rounded-r-lg">
                                        <span className="sr-only">
                                            {isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                        </span>
                                        {isPasswordVisible ? (
                                            <IoEyeOffOutline className="w-6 h-6 text-gray-800 dark:text-white" />
                                        ) : (
                                            <IoEyeOutline className="w-6 h-6 text-gray-800 dark:text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">J'accepte les <a href="#" className="text-primary-700 hover:underline dark:text-primary-500">Termes et Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isLoading ? "cursor-not-allowed" : ""}`}>
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Enregistrement...
                                </div>
                            ) : (
                                "Créer un compte"
                            )}
                        </button>
                        {/* <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer un compte</button> */}
                        <div className="flex justify-center text-sm font-medium text-gray-500 dark:text-gray-400">
                            Vous avez déjà un compte ? <a href="/auth/login" className="text-primary-700 hover:underline dark:text-primary-500">Connectez-vous</a>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Signup;