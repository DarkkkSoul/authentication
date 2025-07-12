import React, { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router'


function Home() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const handleLogout = async () => {
        try {

            // FOR COOKIE
            // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
            //     method: 'POST',
            //     credentials: 'include'
            // })
            // const data = await response.json();
            // if (response.ok) {
            //     console.log(data.message);
            //     navigate('/login');
            // } else {
            //     console.log(data.errorMessage);
            // }

            // FOR LOCAL STORAGE
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.log('ERROR:', error);
        }
    }
    const handleAuthorize = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setUsername(data.username);
                setMessage(data.message);
            } else {
                console.log(data.errorMessage);
                setMessage(data.message);
            }
        } catch (error) {
            console.log('ERROR:', error);
        }
    }
    return (
        <div>
            <div>Welcome HOME</div>
            <button onClick={handleAuthorize}>authorize</button>
            {message && <p>{message}</p>}
            {username && <p>{username}</p>}
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Home