import React from 'react';
import { useEffect, useState } from 'react';
import './App.css'
import { useNavigate, Link } from "react-router";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 2000)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
                // credentials: 'include',
            });


            const data = await response.json();
            const token = data.token;

            if (response.ok) {
                setMessage(data.message);
                localStorage.setItem('token', token);
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                setMessage(data.errorMessage);
            }

        } catch (error) {
            console.error("Error during login: ", error);
            setMessage("Network Error, try again later.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-600 to-black flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gradient-to-br from-gray-600 via-black to-white rounded-xl shadow-2xl shadow-white p-8">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="text-white mt-2">Sign in to your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-black font-semibold py-2 px-6 rounded-lg duration-200 bg-white bg-opacity-70 hover:bg-gradient-to-tl from-gray-900 via-gray-500 to-white transition-all hover:text-white hover:scale-110 active:scale-95 shadow-2xl hover:shadow-white"
                    >
                        Sign Me In!
                    </button>
                </form>

                {message && <p className='text-white mt-4 text-center'>{message}</p>}

                <div className="mt-6 text-center">
                    <p className="text-sm text-white">
                        Don't have an {''}
                        <Link to='/' className='underline'>
                            account?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login