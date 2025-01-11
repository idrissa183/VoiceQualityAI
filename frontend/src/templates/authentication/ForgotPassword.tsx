import { Label, TextInput } from "flowbite-react";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">

                <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Mot de passe oublié
                    </h2>
                    <form className="mt-8 space-y-6">

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput id="email" addon="@" type="email" required />
                        </div>


                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Soumettre</button>
                        <div className="flex justify-center text-sm font-medium text-gray-500 dark:text-gray-400">
                            <a href="/auth/login" className="flex justify-center items-center text-primary-700 hover:underline dark:text-primary-500"><FaArrowLeft className="w-4 h-4 mr-2" />Retour à la connexion</a>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default ForgotPassword;