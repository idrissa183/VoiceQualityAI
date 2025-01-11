import { useState } from 'react';

const usePasswordVisibility = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return {
        type: isPasswordVisible ? 'text' : 'password',
        isPasswordVisible,
        togglePasswordVisibility
    };
};

export default usePasswordVisibility;