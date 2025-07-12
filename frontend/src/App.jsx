import React from 'react';
import { useEffect, useState } from 'react';
import './App.css'
import { useNavigate, Link } from "react-router";

function App() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 900)
        }
    })
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
                // credentials: 'include',
            });

            const data = await response.json();
            const token = data.token;

            if (response.ok) {
                setLoading(false);
                setMessage(data.message);
                // localStorage.setItem('token', token);
                sessionStorage.setItem('token', token);
                setMessage(data.message || "Signup successful!");
                setTimeout(() => {
                    navigate("/home");
                }, 900);
            } else {
                setMessage(data.errorMessage || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signUp: ", error);
            setMessage("Network Error, try again later.");
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-600 to-black flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gradient-to-br from-gray-600 via-black to-white rounded-xl shadow-2xl p-8 shadow-white">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-white mt-2">Join us today!</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-white mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200"
                            placeholder="Enter your full name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-white mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-black font-semibold py-2 px-6 rounded-lg duration-200 bg-white bg-opacity-70 hover:bg-gradient-to-tl from-gray-900 via-gray-500 to-white transition-all hover:text-white hover:scale-110 active:scale-95 shadow-2xl hover:shadow-white"
                    >
                        Sign Me Up!
                    </button>
                </form>

                {loading && <p className='text-white mt-4 text-center'>Loading...</p>}

                {message && <p className='text-white mt-4 text-center'>{message}</p>}

                {/* already have account */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-200">
                        Already have an {''}
                        <Link to="/login" className="underline">
                            account?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default App
