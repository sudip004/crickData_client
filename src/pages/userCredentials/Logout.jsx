import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BACKENDURL}/api/logout`,
                    {},
                    { withCredentials: true }
                );
                navigate('/login', { replace: true }); // Ensure navigation happens
            } catch (error) {
                console.error('API Error:', error);
            }
        };

        logout();
    }, [navigate]);

    return (
        <h1>Logout successfully</h1>
    )
}

export default Logout