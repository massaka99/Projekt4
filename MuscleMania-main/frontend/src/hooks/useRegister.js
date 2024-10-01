import { useState } from 'react';
import { message } from "antd";

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (values, onSuccess) => {
        const { fullName, email, password } = values;

        if (!fullName || !email || !password) {
            return setError('Please fill in all fields');
        }

        try {
            setLoading(true);
            setError(null);

            const res = await fetch('http://localhost:4999/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                onSuccess();
                message.success('Registration successful');
                console.log('Registration successful');
            } else {
                setError(data.message || 'Registration failed');
                message.error(data.message || 'Registration failed');
                console.error('Registration failed:', data.message || 'Registration failed'); 
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError('An error occurred during registration');
            message.error('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
};

export default useRegister;
