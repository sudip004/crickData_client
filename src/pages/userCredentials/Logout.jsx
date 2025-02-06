import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/logout`, {
                    withCredentials: true
                });
                navigate('/login')
            } catch (error) {
                console.error('API Error:', error);
            }
        }
        logout();
    }, [])
  return (
    <h1>Logout successfully</h1>
  )
}

export default Logout